import { handleOpenURL, AppURL } from 'nativescript-urlhandler'
import * as application from 'tns-core-modules/application';
import {isAndroid, isIOS, platformNames} from 'tns-core-modules/platform'
import * as toast from 'nativescript-toast'
import {parseTokenHash} from '@/utils/parsers'
import store from '@/store'
import {getUser} from '@/api/auth'
import User from '@/models/User'

export function registerLoginHandler () {

  handleOpenURL((appUrl: AppURL) => {

    // Close the WebView
    if (isIOS) {
      // Only for IOS
      const controller = application.ios.nativeApp.windows[0].rootViewController;
      controller.dismissViewControllerAnimatedCompletion(true, () => {});
    }
    // For Android, it is automatically closed because of activity intent
    const tokenHash = parseTokenHash(appUrl.path)
    if (typeof tokenHash === 'undefined' || !tokenHash.access_token) {
      toast.makeText("Error in login").show()
      return
    }

    toast.makeText("Login Successful").show()
    store.commit('setAuthToken', tokenHash.access_token)

    getUser().then((data: {result: User}) => {
      store.commit('saveUser', data.result)
    })


  })
}