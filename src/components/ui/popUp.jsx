
import { Code, Email, Facebook, Link, Message, MessageOutlined, More, Twitter, WhatsApp } from '@mui/icons-material'
import React from 'react'

function popUp() {
  return (
    <div>
      <h1 className='text-xl font-weight:400 pt-6 ms-7'>Share the Information</h1>
      <p className='text-l font-weight:200 pt-4 ms-7'>A garden is an organized plot of land or a cultivated space where plants, flowers, fruits, and vegetables are grown for enjoyment, decoration, food, or habitat. </p>

      <div >
        <div>
           <Link>copy link</Link>
        </div>
        <div>
            <Email>Email</Email>
        </div>
        <div>
            <Message>Message</Message>
        </div>
        <div>
            <WhatsApp>WhatsApp</WhatsApp>
        </div>
        <div>
            <MessageOutlined>Messenger</MessageOutlined>
        </div>
        <div>
            <Facebook>Facebook</Facebook>
        </div>
        <div>
            <Twitter>Twitter</Twitter>
        </div>
        <div>
            <Code>Embed</Code>
        </div>
        <div>
            <More> More Options</More>
        </div>
      </div>
    </div>
  )
}

export default popUp
