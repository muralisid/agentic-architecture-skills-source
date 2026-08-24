# Fonts for the share cards

The latin subsets of the two faces the site already uses, committed so the card
renderer has them without a network call during the build.

| File | Face | Source |
|---|---|---|
| `newsreader-600.woff` | Newsreader SemiBold, the display face | Google Fonts, latin subset |
| `sora-400.woff` | Sora Regular, the body face | Google Fonts, latin subset |
| `sora-600.woff` | Sora SemiBold | Google Fonts, latin subset |

Both families are under the SIL Open Font License 1.1, which permits
redistribution. They are here rather than fetched at build time because a card
that depends on fonts.gstatic.com being reachable is a card that renders
differently, or not at all, on a bad build.

`next/font/google` still serves the pages themselves. These copies exist only
for `next/og`, which rasterises with Satori and needs the font bytes directly.
Satori reads TTF, OTF and WOFF, but not WOFF2, which is why these are WOFF.

To refresh, request the CSS with an old user agent so Google returns WOFF
rather than WOFF2, and take the URL from the last (latin) `@font-face` block.
