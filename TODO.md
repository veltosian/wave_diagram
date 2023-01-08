# TODO

## Features

- [] Add wave edit button and functionality
- [] Allow user to change value on wave by clicking on the value to change
- [] Add wave type: manual value input (This is current behaviour shown in the app)
- [] Implement functionality for different types of waves: clock, sequential, combinational, manual value input
- [] Implement vertical markers
- [] Implement zoom in by clicking and dragging over a horizontal section of the waves
- [] Implement zoom out 2x by clicking and dragging a direction (like in VCS)
- [] Allow user to ctl+click and drag to rearrange waves
- [] Continue the wave to the end of the screen at the end of the sequence
- [] Allow user to edit a wave form after creation
- [] Make incorrect wave parameter alert in WaveInput a CSS animation card shake with a red X somewhere and a message appearing that indicates the incorrect wave parameters
- [] Allow wave to be dependent on another
- [] Make WaveInput a drawer on the left side of the screen
  - Consider making it a button at the bottom of the waveform list??? eh, maybe not. But think on it
- [] Dynamically determine wave height in the canvases
- [] Only show one value on multi-bit signals when the value is unchanged for 2 or more cycles

## Bugs

- [] Select wave when SingleWaveDisplay is clicked, not just the WaveCanvas
- [] When zooming way out, the waves start to look like just a single line (which is fine) but the number values for multi-bit signals are still there overlapped with the line and each other. Do not show multi-bit values when width is below some threshold
- [] Make long names look less bad

## Done

- [x] Make width a property of the wave
- [x] Replace width on the wave with period and make WaveDrawing figure out what the width on screen should be
- [x] Make WaveDrawing accept wave logical type and convert to wave draw-type internally
- [x] Implement user input to add a wave
- [x] Make it so that each wave name must be unique
- [x] Add "period" to user wave input fields
- [x] Orient the waves in a vertical list
- [x] Refactor drawing to make each wave it's own canvas
- [x] Create wave-actions drawer (edit, delete, etc)
