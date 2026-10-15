#!/usr/bin/env python3
"""Score the light-mode readiness assessment (version 2) and report the autonomy ceiling.

The twenty-eight questions, the yes/partly/no weights, the per-area rounding,
the ceiling table and the two overrides are reproduced from the published
assessment (references/readiness-assessment.md). Nothing here is invented:
this only does the arithmetic the same way every time, and reports the profile
rather than a total, because the shape of the profile is what the ceiling
table reads.

Seven areas, four questions each. Yes 3, partly 1, no 0. An area's score is
its four answers added, divided by four, rounded down. The weakest area caps
autonomy. Two overrides can only lower the ceiling:

  --tier 3        a Tier 3 workload needs controls at 3 for A3 or above
  --rule-of-two   a session with untrusted input, sensitive data and external
                  action is capped at A2, whatever the scores

Standard library only, no network. Answer for one workload, not for the
organisation.
"""

import argparse
import json
import sys

# Yes = 3, Partly = 1, No = 0, per the assessment's scoring rules.
VALUES = {"yes": 3, "partly": 1, "no": 0}

# Profile order: data, integration, identity, controls, testing, cost, people.
AREAS = [
    ("data", "Data"),
    ("integration", "Integration and tools"),
    ("identity", "Identity and registry"),
    ("controls", "Controls on actions"),
    ("testing", "Testing and operations"),
    ("cost", "Cost and value"),
    ("people", "People and operating model"),
]
KEYS = [key for key, _ in AREAS]
LABELS = dict(AREAS)

QUESTIONS = {
    "data": [
        "Can you name the system of record and accountable owner for each kind of data this agent will use or change?",
        "Is every source the agent can reach classified into the five data classes before go-live, and do outputs carry the highest class of their inputs?",
        "Are material data-quality problems measured, visible and assigned for repair?",
        "Is agent memory governed: classes and permissions carry into it, writes are checked, and entries expire and can be erased?",
    ],
    "integration": [
        "Do the systems the agent needs offer governed APIs, rather than screen automation?",
        "Does a tool gateway enforce an allowlist of tools and versions, inject credentials at run time, and log every call?",
        "Does the requesting person's identity survive every hop to the system of record?",
        "Are events, retries, duplicate protection and undo steps available for long or consequential actions?",
    ],
    "identity": [
        "Is every agent in one registry, with its own identity, a named business sponsor and a technical owner, reviewed at least quarterly?",
        "Does the registry also list agents inside vendor products, so both estates are visible?",
        "Are credentials short-lived, injected at execution, never held by the agent, and no wider than the data class allows?",
        "Has switching the agent off been tested end to end, with the time measured?",
    ],
    "controls": [
        "Is the risk tier set from the factor profile before launch, with its retention and evidence duties?",
        "Does a policy decision point outside the model approve or deny every write and zone action, and fail closed?",
        "If the agent runs code or SQL, is it sandboxed with no network by default and no production credentials, with production changes only through plan-then-apply?",
        "Where a decision significantly affects a person, does a named person with authority to change it decide, with the required notice given?",
    ],
    "testing": [
        "Does a domain expert own 20 to 50 pass-or-fail tasks and a human baseline, and must the agent pass them before go-live?",
        "Are traces and action logs collected where the agent cannot change them?",
        "Does any change to the model, prompt, tools, permissions, data sources or memory policy re-run the evals and risk profile before release?",
        "Is there an on-call incident owner with a tested escalation path, and are rollback and drift checks drilled?",
    ],
    "cost": [
        "Does intake define a resolved outcome, its value, and stop conditions before funding?",
        "Are tokens and spend metered per agent, with a budget and a hard stop that fires before the next call?",
        "Is cost per resolved outcome measured with the one definition in the economics model?",
        "Does AI spend have a named owner, and is it shown back to the business units that use it?",
    ],
    "people": [
        "Are the corpus owner, eval owner and exception supervisors named, with time set aside?",
        "Does the affected team know which exceptions stay human and where escalation goes?",
        "Is burst supervision capacity calculated across the whole approved portfolio?",
        "Are role, skill, works-council where relevant, and unassisted-practice effects planned?",
    ],
}

# Questions that start with a condition. If it does not hold, answer yes and record why.
CONDITIONAL = {15, 16}

# Keys used by the six-group version 1 answer files.
VERSION_1_KEYS = {"operations", "governance", "workforce"}

ORDER = ["A1", "A2", "A3", "A4", "A5"]
NAMES = {
    "A1": "Assisted only",
    "A2": "Delegated tasks",
    "A3": "Supervised autonomy",
    "A4": "Managed autonomy",
    "A5": "Candidacy, per domain only",
}

# The minimum area scores the ceiling table asks for at each level.
NEEDS = {
    "A2": {"data": 2, "integration": 2, "identity": 1, "controls": 1, "testing": 1, "cost": 1, "people": 1},
    "A3": {"data": 2, "integration": 2, "identity": 2, "controls": 2, "testing": 2, "cost": 1, "people": 1},
    "A4": {"data": 2, "integration": 2, "identity": 2, "controls": 3, "testing": 3, "cost": 3, "people": 2},
    "A5": {key: 3 for key in KEYS},
}


def rank(level):
    return ORDER.index(level)


def score_area(answers, label):
    """Add the four answers, divide by four, round down."""
    if not isinstance(answers, list) or len(answers) != 4:
        count = len(answers) if isinstance(answers, list) else "no list of"
        raise ValueError(f"{label}: expected 4 answers, got {count}")
    points = []
    for answer in answers:
        key = str(answer).strip().lower()
        if key not in VALUES:
            raise ValueError(f"{label}: answer must be yes, partly or no; got {answer!r}")
        points.append(VALUES[key])
    return sum(points) // 4


def ceiling_from_profile(scores):
    """The ceiling table, read top down. Returns (level, why)."""
    if min(scores.values()) == 0:
        zero = [LABELS[key] for key in KEYS if scores[key] == 0]
        return "A1", f"an area scores 0: {', '.join(zero)}"
    if all(scores[key] == 3 for key in KEYS):
        return "A5", "all seven at 3; candidacy only, and only with regulator-ready evidence"
    if all(scores[key] >= 2 for key in KEYS) and all(scores[key] == 3 for key in ("controls", "testing", "cost")):
        return "A4", (
            "all seven at 2 or more, with controls, testing and cost at 3; "
            "L2 governed learning and the oversight-capacity gate are required"
        )
    if all(scores[key] >= 2 for key in ("data", "integration", "identity", "controls", "testing")) and all(
        scores[key] >= 1 for key in KEYS
    ):
        return "A3", "data, integration, identity, controls and testing at 2 or more, the others at 1 or more"
    if scores["data"] >= 2 and scores["integration"] >= 2 and all(scores[key] >= 1 for key in KEYS):
        return "A2", "data and integration at 2 or more, all others at 1 or more"
    return "A1", "the profile does not yet meet the A2 row"


def apply_overrides(level, scores, tier, rule_of_two):
    """The two overrides. Each can only lower the ceiling. Returns (level, notes)."""
    notes = []
    if tier == 3:
        if scores["controls"] < 3 and rank(level) >= rank("A3"):
            notes.append(
                f"Tier 3 override: controls is {scores['controls']}, and a Tier 3 workload needs controls "
                f"at 3 for A3 or above, so the ceiling drops from {level} to A2"
            )
            level = "A2"
        else:
            notes.append("Tier 3 override checked: it does not lower the ceiling")
    elif tier in (1, 2):
        notes.append(f"Tier {tier}: the Tier 3 override does not apply")
    else:
        notes.append("Tier not given: pass --tier from the risk profile to check the Tier 3 override")
    if rule_of_two:
        if rank(level) > rank("A2"):
            notes.append(
                f"Rule of Two override: the session holds untrusted input, sensitive data and external "
                f"action, so the ceiling drops from {level} to A2"
            )
            level = "A2"
        else:
            notes.append("Rule of Two override checked: it does not lower the ceiling")
    else:
        notes.append("Rule of Two not met: no session is flagged as holding all three parts (see --rule-of-two)")
    return level, notes


def blocking_gaps(scores, ceiling, tier, rule_of_two):
    """What to fund before asking for the next level up. Returns (next_level, gaps, notes)."""
    if ceiling == "A5":
        return None, [], []
    nxt = ORDER[rank(ceiling) + 1]
    needs = dict(NEEDS[nxt])
    if tier == 3 and rank(nxt) >= rank("A3"):
        needs["controls"] = 3
    gaps = [(LABELS[key], scores[key], needs[key]) for key in KEYS if scores[key] < needs[key]]
    notes = []
    if rule_of_two and rank(nxt) > rank("A2"):
        notes.append(
            "The Rule of Two holds this session at A2. Remove one of untrusted input, sensitive data "
            "or external action before asking for more"
        )
    if nxt == "A4":
        notes.append("A4 also needs L2 governed learning and a passed oversight-capacity gate")
    if nxt == "A5":
        notes.append("A5 candidacy also needs regulator-ready evidence, per domain only")
    return nxt, gaps, notes


def ask_interactively(tier, rule_of_two):
    answers = {}
    print("Twenty-eight questions, four per area, seven areas. Answer yes, partly or no.")
    print("Answer for one workload, and only count a capability that operates in its scope.")
    print("If a question starts with a condition that does not hold, answer yes and record why.\n")
    number = 0
    for key, label in AREAS:
        print(label)
        given = []
        for question in QUESTIONS[key]:
            number += 1
            hint = " (if the condition does not hold, answer yes)" if number in CONDITIONAL else ""
            while True:
                raw = input(f"  {number}. {question}{hint}\n  > ").strip().lower()
                if raw in VALUES:
                    given.append(raw)
                    break
                print("  Answer yes, partly or no.")
        answers[key] = given
        print()
    if tier is None:
        while True:
            raw = input("Risk tier from the risk profile (1, 2 or 3; blank if not yet scored)\n  > ").strip()
            if raw == "":
                break
            if raw in ("1", "2", "3"):
                tier = int(raw)
                break
            print("  Answer 1, 2, 3, or leave it blank.")
    if not rule_of_two:
        while True:
            raw = input(
                "Does one session hold untrusted input, sensitive data and external action? (yes or no)\n  > "
            ).strip().lower()
            if raw in ("yes", "no"):
                rule_of_two = raw == "yes"
                break
            print("  Answer yes or no.")
    print()
    return answers, tier, rule_of_two


def load_answers(path):
    with open(path, encoding="utf-8") as handle:
        answers = json.load(handle)
    if not isinstance(answers, dict):
        sys.exit("the answers file must hold one JSON object with the seven area keys")
    present = set(answers)
    if present & VERSION_1_KEYS and not present >= set(KEYS):
        sys.exit(
            "this looks like a version 1 answer file (six groups, 24 questions). Version 2 has seven "
            f"areas and 28 questions with new wording, so answer it again. The keys are: {', '.join(KEYS)}"
        )
    missing = [key for key in KEYS if key not in answers]
    unknown = sorted(present - set(KEYS))
    problems = []
    if missing:
        problems.append(f"missing areas: {', '.join(missing)}")
    if unknown:
        problems.append(f"unknown areas: {', '.join(unknown)}")
    if problems:
        sys.exit(f"{'; '.join(problems)}. The keys are: {', '.join(KEYS)}")
    return answers


def main():
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=f"Area keys for --answers, in profile order: {', '.join(KEYS)}.",
    )
    parser.add_argument(
        "--answers", help='JSON file: {"data": ["yes","partly","yes","no"], ...} for the seven areas'
    )
    parser.add_argument("--interactive", action="store_true", help="ask the twenty-eight questions on the terminal")
    parser.add_argument(
        "--tier", type=int, choices=(1, 2, 3), help="the workload's risk tier from the risk profile"
    )
    parser.add_argument(
        "--rule-of-two",
        action="store_true",
        help="one session holds untrusted input, sensitive data and external action (caps at A2)",
    )
    parser.add_argument("--workload", default="the workload", help="name, used in the report")
    parser.add_argument("--json", action="store_true", help="emit the result as JSON")
    args = parser.parse_args()

    tier, rule_of_two = args.tier, args.rule_of_two
    if args.interactive:
        answers, tier, rule_of_two = ask_interactively(tier, rule_of_two)
    elif args.answers:
        answers = load_answers(args.answers)
    else:
        parser.error("give --answers <file> or --interactive")

    scores = {}
    for key, label in AREAS:
        try:
            scores[key] = score_area(answers[key], label)
        except ValueError as error:
            sys.exit(str(error))

    from_profile, why = ceiling_from_profile(scores)
    ceiling, override_notes = apply_overrides(from_profile, scores, tier, rule_of_two)
    next_level, gaps, gap_notes = blocking_gaps(scores, ceiling, tier, rule_of_two)

    if args.json:
        print(
            json.dumps(
                {
                    "version": 2,
                    "workload": args.workload,
                    "profile": scores,
                    "tier": tier,
                    "rule_of_two": rule_of_two,
                    "ceiling_from_profile": from_profile,
                    "ceiling": ceiling,
                    "ceiling_name": NAMES[ceiling],
                    "reason": why,
                    "overrides": override_notes,
                    "next_level": next_level,
                    "gaps": [{"area": area, "score": score, "needs": needs} for area, score, needs in gaps],
                    "notes": gap_notes,
                },
                indent=2,
            )
        )
        return

    print(f"\nReadiness profile for {args.workload}\n")
    for key, label in AREAS:
        print(f"  {label:<34} {scores[key]}/3  {'#' * scores[key] + '.' * (3 - scores[key])}")
    print(f"\n  Profile: {', '.join(str(scores[key]) for key in KEYS)} (report the shape, never a total)")
    print(f"  Autonomy ceiling: {ceiling} ({NAMES[ceiling]})")
    print(f"  Because: {why}")
    for note in override_notes:
        print(f"  {note}")
    if next_level and (gaps or gap_notes):
        print(f"\n  To reach {next_level}, fund these first:")
        for area, score, needs in gaps:
            print(f"    {area:<34} {score}/3, needs {needs}")
        for note in gap_notes:
            print(f"    {note}")
    print(
        "\n  The ceiling is a cap, not a target. Start below it and earn the move. At A4 and\n"
        "  above, the oversight-capacity gate applies as well: check the burst rate of exceptions\n"
        "  across the whole approved portfolio, not the average load.\n"
    )


if __name__ == "__main__":
    main()
