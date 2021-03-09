import React from 'react';
import { useForm } from 'react-hook-form';

export default function AddContact() {
  let data = {
    name: 'Marios',
    email: 'mariosffx@gmail.com',
    address: '',
    tel: [ 
      {
        telType: 'home',
        telNumber: '00306989627168'
      }
    ]
  }

  function onAddTelephone(e) {
    e.preventDefault();
    data = { tel: [...data.tel, {}] };
  }
  function onRemTelephone(e) {
    e.preventDefault();
    let newTels = [...data.tel];
    newTels.pop();
  
    data = { tel: [ ...newTels ] };
  }
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: 'Marios',
      email: 'marios@web-coders.net',
      address: '',
      tel: [
        {
          telType: 'Home',
          telNumber: '00302105314186'
        },
        {
          telType: 'Mobile',
          telNumber: '00306989627168'
        }
      ]
    }
  });
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form className="form" onSubmit= { handleSubmit (onSubmit) }>
      <h4>Name</h4>
      <input 
        type="text" 
        placeholder="John Doe" 
        name="name"
        ref= {
          register ( {
            required: true, 
            pattern: /([a-zA-Z0-9]{2,})\w+/i
          })} 
      />
      <br />
      <div>
      { errors.name && 
        <span>
            Name is required and must be at least &nbsp;
            <span className="instructions">
              2 characters
            </span>
        </span>
      }
      </div>
      <h4>Email</h4>
      <input type="email" 
        placeholder="mariosffx@gmail.com" 
        name="email" 
        ref= {
          register (  {
            required: true, 
          })} 
      />
      <div>
        { errors.email && 
          <span>
            Please enter a valid email addresss
          </span>
        }
      </div>
      
      <h4>Address</h4>
      <input type="text" 
        placeholder="Avenue Str 44, 57121 New York, USA" 
        name="address" 
        ref=  {
          register  ( {
            pattern: /([a-zA-Z0-9]{1,}[\s\S]\w*)\s([0-9]{1,})\\,\s([0-9]{2,})\s([a-zA-Z0-9]{1,}[\s\S]\w*)\\,\s([a-zA-Z]{2,})/i
          })} 
      />

      <div>
      { errors.address && 
        <span>
          Address is not required to be filled. However, if you want to add your address, enter it in the same format as: <br />
          <span className="instructions">
            Kolokotroni 14, 12242 Egaleo, Greece
          </span>
        </span>
      }
      </div>

      <h4>Telephones</h4>



        {data.tel.map((i) => (
          <div key={i}>
            <input type="tel" 
              placeholder="00306989627168"
              name  = "telType"
              value = {i.telNumber}
              ref=  {
                register  ( {
                  required: true,
                  maxLength: 14, 
                  pattern: /([0-9]{14})/i
                })} 
            />
            <div>
              { errors.telNumber && 
                <span>
                  Length of the phone must be 14 Numbers <br />
                  and in the following format:
                  <span className="instructions">
                    00306989627168
                  </span>
                </span>
              }
            </div>
          </div>
        ))
      }


      <button className="btn btn-success m-2" 
            onClick={(e) => onAddTelephone(e)}>
            Add new Number
          </button>
          <button className="btn btn-danger m-2" 
            onClick={(e) => onRemTelephone(e)}>
            Remove Last Number
          </button>




      <br />
      <button className="process" type="submit">
       Add Contact
      </button>
    </form>
  );
}