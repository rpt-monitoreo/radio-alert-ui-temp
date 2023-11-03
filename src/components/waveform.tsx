/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';
import Minimap from 'wavesurfer.js/dist/plugins/minimap.js';

interface WaveformProps {
  url: string;
  onSelection: (start: number, end: number) => void;
}

const Waveform: React.FC<WaveformProps> = ({ url, onSelection }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      if (!waveformRef.current) return;

      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        url: url,
        waveColor: '#0080ff',
        progressColor: '#004080',
        cursorColor: '#ffffff',
        cursorWidth: 2,
        barWidth: 1,
        barGap: 1,
        barRadius: 1,
        barHeight: 0.7,

        minPxPerSec: 2, //El ancho del audio muestra o no la barra

        plugins: [
          TimelinePlugin.create({
            height: 24,
            insertPosition: 'beforebegin',
            timeInterval: 5,
            primaryLabelInterval: 60,
            secondaryLabelInterval: 30,
            style: {
              fontSize: '18px',
              color: '#2D5B88',
            },
          }),
          Minimap.create({
            container: waveformRef.current,
            height: 20,
            waveColor: '#ddd',
            progressColor: '#999',
            // the Minimap takes all the same options as the WaveSurfer itself
          }),
        ],
      } as any);

      const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());
      wavesurfer.on('decode', () => {
        // Markers (zero-length regions)
        wsRegions.addRegion({
          start: 19,
          content: '1',
          color: 'green',
        });
        wsRegions.addRegion({
          start: 20,
          content: '2',
          color: 'red',
        });
        wsRegions.getRegions()[0].setOptions({ start: 120 });
      });
      let touchtime = 0;
      wavesurfer.on('click', () => {
        if (touchtime == 0) {
          // set first click
          touchtime = new Date().getTime();
        } else {
          // compare first click to this click and see if they occurred within double click threshold
          if (new Date().getTime() - touchtime < 800) {
            // double click occurred

            wavesurfer.play();
            touchtime = 0;
          } else {
            // not a double click so set as a new first click
            touchtime = new Date().getTime();
          }
        }
      });

      return () => wavesurfer.destroy();
    }
  }, [url, onSelection]);

  return <div ref={waveformRef} />;
};

export default Waveform;
