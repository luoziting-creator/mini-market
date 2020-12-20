import { request } from "../../services/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";

Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
   
      
    // 1 获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    console.log(e.detail);
    // 2 获取小程序登录成功后的code
    const { code } = await login();
    console.log(code);
    const loginParams={ encryptedData, rawData, iv, signature ,code};
    console.log(loginParams);
    //  3 发送请求 获取用户的token
    const res=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
    console.log(res);
    // 4 把token存入缓存中 同时跳转回上一个页面
   
  
    
  }
})