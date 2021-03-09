import React from 'react';

export const Message = props => 
    <div className="text-center">
        {props.header 
        ?
            <h3 className="message-header">{props.header}</h3>
        : null
        }
        <div className="message-body"> 
            {
            props.text
            ? props.text 
            :   <span>
                    "We will reply to your message in next 24h. Have a nice day! ;-)"
                    <br />
                    {props.children}
                </span>
            }
        </div>
        
    </div>
