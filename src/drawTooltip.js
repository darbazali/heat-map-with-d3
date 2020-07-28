import * as d3 from 'd3'

export const drawTooltip = (d, tooltip) => {
    tooltip
        .style('opacity', 0.98)
        .style('left', `${d3.event.layerX}px`)
        .style('top', `${d3.event.layerY - 50}px`)

        .attr('data-year', d.year.getFullYear())

        .html( () => {
            return `
                ${d.year.getFullYear()} - ${d.month}<br/>
                ${d.temp}<br/>
                ${d.variance}
            `
        })
}