import React from 'react'

export const YouTubeWidget = ({widget, updateWidget}) => {
    let src
    return(
        <div>
            <h3>YouTube Widget</h3>
            <input ref={node => src = node}
                   id="URL"
                   onChange={() => {
                       widget.url = src.value;
                       updateWidget(widget);
                   }}
                   className="form-control"/>
            <h4>Preview</h4>
            {widget.url}
            <iframe width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${widget.url}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen></iframe>
        </div>
    )
}
