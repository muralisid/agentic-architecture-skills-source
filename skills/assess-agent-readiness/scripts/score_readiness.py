#!/usr/bin/env python3
"""Score the light-mode readiness assessment and report the autonomy ceiling.

The twenty-four questions, the yes/partly/no weights, the per-dimension
rounding and the gate table are reproduced from the published assessment
(references/readiness-assessment.md). Nothing here is invented: this only does
the arithmetic the same way every time, and reports the profile rather than a
total, because the shape of the profile is what the gate table reads.

Standard library only, no network. Answer for one workload, not for the
organisation.
"""

import argparse
import json
import sys

# Yes = 3, Partly = 1, No = 0, per the assessment's scoring rules.
VALUES = {"yes": 3, "partly": 1, "no": 0}

DIMENSIONS = [
    ("data", "Data readiness"),
    ("integration", "Integration readiness"),
    ("identity", "Identity readiness"),
    ("operations", "Operational discipline"),
    ("governance", "Governance and value discipline"),
    ("workforce", "Workforce and operating model"),
]

QUESTIONS = {
    "data": [
        "Can you name the system of record and accountable data owner for each entity this agent will use or change?",
        "Are material quality issues measured, visible, and assigned for remediation?",
        "Do source permissions propagate into indexes, caches, traces, and other derived artifacts?",
        "Can a purpose-scoped corpus be assembled, refreshed, and erased within the funding period?",
    ],
    "integration": [
        "Do required systems expose governed APIs rather than depend on screen automation?",
        "Does a tool gateway enforce allowlists, runtime credential injection, and audit?",
        "Does the requesting human's identity survive every hop through on-behalf-of or equivalent delegation?",
        "Are events, idempotency, retry, and compensation available for long-running or consequential actions?",
    ],
    "identity": [
        "Does every production agent have an ID2 first-class identity and named business sponsor?",
        "Are credentials short-lived, injected at execution, and never stored by the agent?",
        "Are permissions task-scoped and reviewed whenever tools or capabilities change?",
        "Has revocation or a kill switch been exercised end to end?",
    ],
    "operations": [
        "Does a domain SME own twenty to fifty pass-or-fail eval tasks and a human baseline?",
        "Are traces and action logs collected outside the agent's control?",
        "Is an incident owner alerted after hours, with a tested escalation path?",
        "Are drift, cost, supervision load, and rollback measured or drilled in production?",
    ],
    "governance": [
        "Does intake define a resolved outcome, its value, and kill criteria before funding?",
        "Are deterministic zones identified, with decisions enforced outside the model?",
        "Are risk and classification tier, retention, and evidence duties set before launch?",
        "Is cost per resolved outcome measured including supervision and wrong-outcome cost, with a budget envelope?",
    ],
    "workforce": [
        "Are the business sponsor, technical owner, corpus owner, and supervisor named?",
        "Does the affected team know which exceptions stay human and where escalation goes?",
        "Is burst supervision capacity calculated across the whole approved portfolio?",
        "Are role, skill, works-council where relevant, and unassisted-practice impacts planned?",
    ],
}

CORE_FOUR = ("data", "integration", "identity", "operations")


def score_dimension(answers, label):
    """Add the four answers, divide by four, round down."""
    if len(answers) != 4:
        raise ValueError(f"{label}: expected 4 answers, got {len(answers)}")
    points = []
    for answer in answers:
        key = str(answer).strip().lower()
        if key not in VALUES:
            raise ValueError(f"{label}: answer must be yes, partly or no; got {answer!r}")
        points.append(VALUES[key])
    return sum(points) // 4


def ceiling_for(scores):
    """The gate table, read top down. Returns (level, name, why)."""
    if min(scores.values()) == 0:
        zero = [label for key, label in DIMENSIONS if scores[key] == 0]
        return "A1", "Assisted only", f"a dimension scores 0: {', '.join(zero)}"
    if all(scores[k] == 3 for k, _ in DIMENSIONS):
        return "A5", "Candidacy, per domain only", "all six at 3, and only with regulator-ready evidence"
    if all(scores[k] >= 2 for k, _ in DIMENSIONS) and scores["operations"] == 3 and scores["governance"] == 3:
        return "A4", "Managed autonomy", "all six at 2 or more, with operations and governance at 3; L2 governed learning required"
    if all(scores[k] >= 2 for k in CORE_FOUR):
        return "A3", "Supervised autonomy", "data, integration, identity and operations at 2 or more"
    if scores["data"] >= 2 and scores["integration"] >= 2 and all(scores[k] >= 1 for k, _ in DIMENSIONS):
        return "A2", "Delegated tasks", "data and integration at 2 or more, the others at 1 or more"
    return "A1", "Assisted only", "the profile does not yet meet the A2 gate"


def blocking_gaps(scores, ceiling):
    """What to fund before asking for the next level up."""
    order = ["A1", "A2", "A3", "A4", "A5"]
    nxt = order[min(order.index(ceiling) + 1, len(order) - 1)]
    needs = {
        "A2": {"data": 2, "integration": 2, "identity": 1, "operations": 1, "governance": 1, "workforce": 1},
        "A3": {"data": 2, "integration": 2, "identity": 2, "operations": 2, "governance": 1, "workforce": 1},
        "A4": {"data": 2, "integration": 2, "identity": 2, "operations": 3, "governance": 3, "workforce": 2},
        "A5": {k: 3 for k, _ in DIMENSIONS},
    }.get(nxt, {})
    labels = dict(DIMENSIONS)
    return nxt, [(labels[k], scores[k], v) for k, v in needs.items() if scores[k] < v]


def ask_interactively():
    answers = {}
    print("Twenty-four questions, four per dimension. Answer yes, partly or no.")
    print("Answer for one workload, and only count a capability that operates in its scope.\n")
    for key, label in DIMENSIONS:
        print(label)
        given = []
        for question in QUESTIONS[key]:
            while True:
                raw = input(f"  {question}\n  > ").strip().lower()
                if raw in VALUES:
                    given.append(raw)
                    break
                print("  Answer yes, partly or no.")
        answers[key] = given
        print()
    return answers


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--answers", help='JSON file: {"data": ["yes","partly",...], ...} for the six dimensions')
    parser.add_argument("--interactive", action="store_true", help="ask the twenty-four questions on the terminal")
    parser.add_argument("--workload", default="the workload", help="name, used in the report")
    parser.add_argument("--json", action="store_true", help="emit the result as JSON")
    args = parser.parse_args()

    if args.interactive:
        answers = ask_interactively()
    elif args.answers:
        with open(args.answers, encoding="utf-8") as handle:
            answers = json.load(handle)
    else:
        parser.error("give --answers <file> or --interactive")

    missing = [key for key, _ in DIMENSIONS if key not in answers]
    if missing:
        sys.exit(f"missing dimensions: {', '.join(missing)}")

    scores = {}
    for key, label in DIMENSIONS:
        try:
            scores[key] = score_dimension(answers[key], label)
        except ValueError as error:
            sys.exit(str(error))

    ceiling, ceiling_name, why = ceiling_for(scores)
    next_level, gaps = blocking_gaps(scores, ceiling)
    labels = dict(DIMENSIONS)

    if args.json:
        print(
            json.dumps(
                {
                    "workload": args.workload,
                    "profile": scores,
                    "ceiling": ceiling,
                    "ceiling_name": ceiling_name,
                    "reason": why,
                    "next_level": next_level,
                    "gaps": [{"dimension": d, "score": s, "needs": n} for d, s, n in gaps],
                },
                indent=2,
            )
        )
        return

    print(f"\nReadiness profile for {args.workload}\n")
    for key, label in DIMENSIONS:
        print(f"  {label:<34} {scores[key]}/3  {'#' * scores[key] + '.' * (3 - scores[key])}")
    print(f"\n  Profile: {', '.join(str(scores[k]) for k, _ in DIMENSIONS)} (report the shape, never a total)")
    print(f"  Autonomy ceiling: {ceiling} ({ceiling_name})")
    print(f"  Because: {why}")
    if gaps:
        print(f"\n  To reach {next_level}, fund these first:")
        for dimension, score, needs in gaps:
            print(f"    {dimension:<34} {score}/3, needs {needs}")
    print(
        "\n  The ceiling is a cap, not a target. Start below it and earn the move. Above A3,\n"
        "  the oversight-capacity gate applies as well: check the burst rate of exceptions\n"
        "  across the whole approved portfolio, not the average load.\n"
    )


if __name__ == "__main__":
    main()
