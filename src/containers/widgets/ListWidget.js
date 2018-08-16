import React from 'react'

export const ListWidget =
    ({widget, preview, textChange, titleChange, listTypeChange}) => {
        let text;
        let title;
        let listType;
        return (
            <div>
                <div hidden={preview}>
                    <h3>List Widget</h3>
                    <textarea onChange={() => textChange(widget.id, text.value)}
                              value={widget.text}
                              className="form-control"
                              placeholder="One list item per row"
                              ref={node => text = node}/>
                    <input onChange={() => titleChange(widget.id, title.value)}
                           value={widget.name}
                           className="form-control"
                           placeholder="Widget name"
                           ref={node => title = node}/>
                    <select onChange={() => listTypeChange(widget.id, listType.value)}
                            value={widget.listType}
                            className="form-control"
                            ref={node => listType = node}>
                        <option value="ol">Ordered</option>
                        <option value="ul">Unordered</option>
                    </select>
                    <h5>
                        Preview
                    </h5>
                </div>
                <ul hidden={widget.listType !== 'ul'}>
                    {widget.text.split("\n").map(token => (<li key={token + Math.random()}>{token}</li>))}
                </ul>
                <ol hidden={widget.listType !== 'ol'}>
                    {widget.text.split("\n").map(token => (<li key={token + Math.random()}>{token}</li>))}
                </ol>
            </div>
        )
    };