import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';

import {  scaleBand, scaleLinear } from '@vx/scale';

export default function h({ data, width, height }) {
  // bounds
  const xMax = width;
  const yMax = height - 120;

  // domain

  const dxMax = data.map(obj => obj.month)

  // scales
  const xScale = scaleBand({
    range: [0, xMax],
    domain: dxMax,
    padding: 0.4
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, Math.max(...data.map(obj => obj.posts.length))]
  });
  return (
    <svg width={width+100} height={height}>
      <rect width={width+100} height={height} fill={""} rx={14} />
      <Group left={100} top={50}>
        {data.map((obj, index) => {
          let numPosts = obj.posts.length
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(numPosts);
          const barX = xScale(obj.month);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${obj.month}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .7)"
              onClick={event => {
                alert(`clicked: ${obj.month} number of posts: ${numPosts}`);
              }}
            />
          )
        })}
      </Group>
      <AxisBottom
         scale={xScale}
         top={yMax + 50}
         left={100}
         label='Month'
         labelProps={{ fontSize: 24, fill: 'rgba(23, 233, 217, .8)' }}
         tickLabelProps={() => ({
            fill: 'rgba(255, 255, 255, .8)',
            fontSize: 15,
            textAnchor: 'middle',
          })}
       />
       <AxisLeft
         scale={yScale}
         top={50}
         left={100}
         label="Posts"
         labelProps={{ fontSize: 24, fill: 'rgba(23, 233, 217, .8)' }}
         tickLabelProps={() => ({
            fill: 'rgba(255, 255, 255, .8)',
            fontSize: 15,
            textAnchor: 'middle',
          })}
       />
    </svg>
  );
};
