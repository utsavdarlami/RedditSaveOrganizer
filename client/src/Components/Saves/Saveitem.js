/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-dupe-keys */
import React from 'react';

const Saveitem=({saveItem})=>{
    return(
        // <p>Single Save Item</p>
        //Pass Correct value as props
        <div className='card text-white bg-dark' style={{marginTop: '10px'}}>
            <div className='card-header'
                    style={{background: 'rgb(56,55,55)',
                            background: ' linear-gradient(90deg, rgba(56,55,55,1) 71%, rgba(19,88,99,1) 100%)'}}>
                    {"r/" +saveItem.subreddit}
            </div>
            <div className='row no-gutters'>
                <div className='col-auto'>
                   {
                        saveItem.nsfw ?
                            <img src={saveItem.url} 
                                 alt="" 
                                 style={{width:'90px',
                                         height:'90px',
                                         border:'1px',
                                         marginTop:'10px', 
                                         marginBottom:'5px', 
                                         marginLeft:'10px', 
                                         marginRight:'10px', 
                                         WebkitFilter:'blur(6px)'
                                        }}
                            />
                        :
                            <img src={saveItem.url} 
                                alt="" 
                                style={{width:'90px',
                                    height:'90px',
                                    border:'1px',
                                    marginTop:'10px',
                                    marginBottom:'5px', 
                                    marginLeft:'10px', 
                                    marginRight:'10px'
                                }}
                            />
                   }
                </div>
                <div className='col'>
                    <div>
                        <h5 className='card-title'>{saveItem.title}</h5>
                        {saveItem.nsfw ?<h3>[NSFW]</h3> : null}
                        <a href={"https://reddit.com"+saveItem.link} target="_blank" className='btn btn-primary'>Go To Post</a>
                    </div>
                </div>
            </div>  
        </div>

    );
    
}
export default Saveitem;

