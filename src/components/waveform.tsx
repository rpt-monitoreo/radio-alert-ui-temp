/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import WaveSurfer, { WaveSurferEvents } from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';

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
          RegionsPlugin.create(),
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
        ],
      } as any);

      wavesurfer.on('click', () => {
        wavesurfer.play();
      });

      /* wavesurfer.on(
        'region-created' as keyof WaveSurferEvents,
        (region: Region) => {
          region.on('update-end', () => {
            onSelection(region.start, region.end);
          });
        },
      ); */

      return () => wavesurfer.destroy();
    }
  }, [url, onSelection]);

  return <div ref={waveformRef} />;
};

export default Waveform;
