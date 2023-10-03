import React from 'react'
import book from './book.png'
import {Link} from 'react-router-dom'
const Card = (props) => {
  return (
    <Link to={props.path}>
    <div className={props.color}>
                    <div className='flex py-3 justify-between'>
                        <div>
                        <img src={book} alt='book' className='float-left'/></div>
                        <div className=''>
                        <h3 className='font-bold text-2xl hover:text-white cursor-pointer'>...</h3></div>
                        
                    </div>
                    <div className='flex py-3 justify-start'>
                            <h4 className='text-xl tracking-wide '>{props.pub}</h4>
                            {/* <div className=''><p>Storage 8GB</p></div> */}
                        </div>

                        <div className='py-3 pb-6'><h3 className='text-3xl tracking-wider font-bold text-left'>{props.len} files</h3></div>
                        
                       <div className='flex justify-between tracking-wider   rounded-xl  cursor-pointer hover:opacity-10'><h4 className='font-bold '>View</h4>
                        <h5 className='text-2xl '>&#x2192;</h5></div>
                        
                </div>
                </Link>
  )
}

export default Card