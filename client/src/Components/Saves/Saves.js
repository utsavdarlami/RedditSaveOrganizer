/* eslint-disable no-dupe-keys */
import React from 'react';
import Saveitem from  './Saveitem';
import Spinner from '../Layout/Spinner';
const Saves=({allSaves,loading})=>{
    if(loading)
    {
        return(
            <Spinner/>
        )
    }
    else{
        return(
            <div>
              { Object.keys(allSaves).map(save=><Saveitem key={save} saveItem ={allSaves[save]} />)}
              {/* // Looping through allSaves object and pass each save as props  */}
            </div>
        );
    }

}
export default Saves;