"use strict"

const mongoose = require("mongoose")
const { Schema } = require("mongoose")

var UsersSchema = new Schema(
  {
      userName:{
          type:String,
          required:true
      },
      mobile:{
          type:Number,
          required:true,
          unique:true
      },
      display_name:String,
      About:String,
      email:{
        type:String,
        required:true,
        unique:true
      },
      profile_pic:{
        type:String,
      },
      createdAt:{
          type:Date,
          default:Date.now
      }
  },
  { collection: "users", timestamps: true, versionKey: false }
)

module.exports = mongoose.model("users", UsersSchema)


