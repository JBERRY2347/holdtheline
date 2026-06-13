# Hold the Line

A team-vs-team **bluffing party game** that runs entirely in your browser. The defending
team keeps its planted lies calm while the other team watches a live **composure / tells**
meter and tries to call the lies.

**It's a game, not a lie detector.** The meter reads how *calm or expressive* you look —
not whether anything you say is true. A calm liar wins. Everything runs on your device:
nothing is recorded, uploaded, or sent anywhere.

▶ **Play it:** https://jberry2347.github.io/holdtheline/

> Needs a device with a camera (phone, tablet, or laptop). On first load it downloads a
> small (~3 MB) on-device face model, then works offline. Add it to your home screen to
> play it like an app.

## How to play

1. Make two teams and add each player's name.
2. Each round, one team **defends**. They privately get a dossier of claims — some they must
   answer truthfully, some they must **lie** about convincingly.
3. Each defender takes the chair. As they answer, the live meter shows their composure. Keep
   it calm (left of the line) and your lie survives; spike it and you give yourself away.
4. The other team **calls** the claims they think were lies. A calm liar beats a wrong guess.
5. First team to the target score wins. A short recap crowns the **coldest bluff** and the
   **biggest tell**.

Tip: run the 8-second **calibration** for each player first — it captures their normal face
so the meter reads *their* tells, not just an expressive face. You can skip it and the meter
falls back to raw expressiveness.

## Modes

- **Hold the Line** — the core game: defend a dossier, the other team calls the lies.
- **Pass the Pressure** — tag a teammate into the chair mid-round; the meter re-anchors to
  whoever's sitting down, so pick who delivers the riskiest lie.
- **Two Truths · One Cover** — three claims, one cover lie, one guess. Fast rounds.
- **The Heist** — co-op: both teams together keep every cover story under the warden's
  threshold. Beat the meter, not each other.
- **The Auction** — interrogators wager points before they call. Read it right and clean up;
  read it wrong and pay.

## Privacy

All camera and (optional) microphone analysis happens **on your device**, in the moment.
No video or audio is recorded, stored, or transmitted. The only thing saved is each player's
numeric baseline profile in your browser's local storage, so you don't re-calibrate every
round. See [privacy.html](privacy.html).

## Run it locally

It's a single static HTML file — serve the folder over `localhost` (the camera needs HTTPS
or localhost) and open it:

```sh
py -m http.server 8781        # then open http://localhost:8781
# or:  npx http-server -p 8781
```

## Under the hood

Pure HTML/CSS/JS, no build step. Face analysis uses Google MediaPipe's FaceLandmarker
(blendshapes) loaded from a CDN; optional voice cues use the Web Audio API. The composure
engine is shared with its sibling project **CueSight**. The whole game is a thin
orchestration layer over that engine — a single `match` state object and a pure
`reduce(match, event)` reducer, structured so a networked multi-device mode could be added
later without a rewrite.
