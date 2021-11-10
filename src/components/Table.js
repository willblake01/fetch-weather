import React from 'react';

export const Table = ({tableRows}) => (
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        { tableRows ? tableRows.map(row => {
          return (
            <tr key={row}>
              <td>
                {row[0]}
              </td>
              <td>
                {row[1]}
              </td>
            </tr>
          )
        }) : null }
      </tbody>
    </table>
)
