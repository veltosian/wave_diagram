# TODO

## Features

- [] Make WaveInput a drawer on the left side of the screen
  - Consider making it a button at the bottom of the waveform list??? eh, maybe not. But think on it
- [] Add wave edit button
- [] Add wave edit functionality
- [] Allow user to edit a wave form after creation
- [] Add wave type: manual value input (This is current behaviour shown in the app)
- [] Implement functionality for different types of waves: clock, sequential, combinational, manual value input
- [] Implement vertical markers
- [] Implement zoom in by clicking and dragging over a horizontal section of the waves
- [] Implement zoom out 2x by clicking and dragging a direction (like in VCS)
- [] Allow user to ctl+click and drag to rearrange waves
- [] Continue the wave to the end of the screen at the end of the sequence
- [] Make incorrect wave parameter alert in WaveInput a CSS animation card shake with a red X somewhere and a message appearing that indicates the incorrect wave parameters
- [] Allow wave to be dependent on another
- [] Dynamically determine wave height in the canvases
- [] Only show one value on multi-bit signals when the value is unchanged for 2 or more cycles
- [] Select portion of a wave and drag it to the left or the right. Overwriting one side and extending the other

## Bugs

- [] Fix fucntionality when adding new wave with existing name. The box highlights red and the message pops up but the user is still able to add the wave with the same name
- [] Fix placement of the multibitEdit component when clikcing on a multibitWave
- [] Fix the N/A and undefined that happens if I click on the canvas but to the right of the wave where there is no value
- [] Select wave when SingleWaveDisplay is clicked, not just the WaveCanvas
- [] When zooming way out, the waves start to look like just a single line (which is fine) but the number values for multi-bit signals are still there overlapped with the line and each other. Do not show multi-bit values when width is below some threshold
- [] Make long names look less bad
- [] Make it so a trailing comma in the New Wave Sequence field is okay and handled

## Cleanup

- [] Add a uuid to each wave and use that instead of name everywhere that I need unique identifier

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
- [x] Allow user to change value on wave by clicking on the value to change
- [x] Update multibitEdit component to show a clickable button that lets you submit the change instead of solely relying on the enter key
- [x] Refactor App.js. Take out a lot of the logic into custom hooks and/or take that logic into a sub-component
- [x] Remove delay to show that a sequence has been put in correct in WaveInput.js. Shoudl take a second to show that it is bad but instantly show if it is good
