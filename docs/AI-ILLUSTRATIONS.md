# AI-generated illustrations: use and limits

The guide uses seven ChatGPT-generated raster illustrations: two exploded part overviews for recognition and five illustrations of the hand-screw bearing-tool workflow. HTML/SVG drawings handle the rest of the guide's counted fasteners, named connections, assembly states, and labels because those require repeatable placement and unambiguous text.

## Included images

- [Limited hub-parts overview](../assets/generated/hub-parts-exploded-v4.png) — the component families in the supplied catalogue-style reference, including one representative wheel stud and a partial axle reference. Knuckle housing is deliberately omitted.
- [Expanded front-corner overview](../assets/generated/front-corner-exploded-v4.png) — the knuckle, steering, suspension and brake context. Lower-arm flange hardware is deliberately omitted; the written guide specifies one bolt and two nuts.

- [Tool-family recognition illustration](../assets/generated/oemtools-kit-recognition-v3.png) — not an exact inventory or verified product photograph.
- [Hub-removal illustration](../assets/generated/hub-removal-v3.png) — extraction concept and reaction on the knuckle.
- [Bearing-removal illustration](../assets/generated/bearing-removal-v3.png) — old-bearing exit direction and receiver clearance.
- [New-bearing installation illustration](../assets/generated/bearing-installation-v3.png) — force on the outer ring only.
- [Hub-installation illustration](../assets/generated/hub-installation-v3.png) — support at the opposite inner ring.

The images were reviewed and corrected for visible stack/contact errors. They remain simplified educational cutaways. Their contours, colors, recess depths, adapter shapes, and clearances are illustrative. They are not Toyota CAD, fixture drawings, or proof that a real adapter fits.

## What AI helps with

AI is useful for turning an already sourced operation into a visual sequence, generating alternate perspectives, identifying visible components in a supplied photo, drafting labels, comparing source documents, and finding likely omissions for a human reviewer to check. Browser automation can verify that controls work, images load, anchors resolve, and the page prints cleanly.

AI does not establish a torque specification, vehicle/build fitment, hidden geometry, a fastener's condition, adapter dimensions, tool equivalence, bearing seating, or the safety of a loaded press setup. Generated visuals can look convincing while being mechanically wrong. Use the linked source, the actual tool manual, direct physical fit checks, and competent mechanical review for those questions.

## Safe prompt patterns for future illustrations

**Photo annotation:** Use a supplied, unmodified reference photo of the target vehicle. Preserve all visible parts and fasteners. Label only independently verified visible connections; mark occluded or uncertain features. Add no torque values, hidden fasteners, or inferred dimensions.

**Tool recognition:** Use a supplied manufacturer product reference only to identify the tool family. Show components individually for recognition. Do not invent adapter sizes, capacity, markings, or compatibility.

**Force-path cutaway:** Show one simplified operation and its direction. Distinguish the bearing outer ring from the inner rings and seals. Label orientation and reaction surfaces. Include no dimensions or force ratings. Review every contact, gap, and implied reaction path against written source material before publication.

## Overview illustration review

The supplied diagram was used for part inventory and composition. Its model applicability and catalogue callouts were not treated as verified 2011 part numbers. Early renders invented six-hole hub/rotor patterns, a fragmented snap ring, and misleading connection leaders. The selected limited image was corrected to five holes and one C-shaped ring. The selected expanded image has five hub studs and rotor holes; false strut-to-caliper and tie-rod-to-sensor leaders were removed. Its lower-arm flange hardware was omitted to keep broad recognition separate from the counted fastener views. Casting contours, handedness and sensor-boss positions remain conceptual.

Exact generation and correction prompts are recorded in [assembly-image-prompts.json](assembly-image-prompts.json). Exploded layout is not a repair sequence or an adapter-fit drawing.
