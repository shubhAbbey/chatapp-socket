"use strict"

const mongoose = require("mongoose")
const { Schema } = require("mongoose")

var ChatsSchema = new Schema(
  {
      mobile:{
          type:Number,
          required:true
      },
      message:{
        type:String,
        required:true
      },
      groupName:{
        type:String,
      },
      users:
          {from:Number, to:Array}
       ,
      createdAt:{
          type:Date,
          default:Date.now
      }
  },
  { collection: "chats", timestamps: true, versionKey: false }
)

module.exports = mongoose.model("chats", ChatsSchema)


