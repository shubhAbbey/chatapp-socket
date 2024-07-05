"use strict"

const mongoose = require("mongoose")
const { Schema } = require("mongoose")

var ChatsSchema = new Schema(
  {
      userName:{
          type:String,
          required:true
      },
      groupName:{
        type:String,
        required:true
      },
      groupUsers:{
        type:Array
      },
      createdAt:{
          type:Date,
          default:Date.now
      }
  },
  { collection: "chats", timestamps: true, versionKey: false }
)

module.exports = mongoose.model("chats", ChatsSchema)


