/*
From Apple's TVMLAudioVideo example app.
*/

import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {
    // MARK: Properties
    
    var window: UIWindow?
    
    var appController: TVApplicationController?
    
    
    static let TVBaseURL = "http://okofish.github.io/TwitchView/client/"
    //static let TVBaseURL = "https://jesse.ws/tvos/bobross/"
    
    static let TVBootURL = "\(AppDelegate.TVBaseURL)js/application.js"
    
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        // Override point for customization after application launch.
        window = UIWindow(frame: UIScreen.mainScreen().bounds)
        
        /*
        Create the TVApplicationControllerContext for this application
        and set the properties that will be passed to the `App.onLaunch` function
        in JavaScript.
        */
        let appControllerContext = TVApplicationControllerContext()
        
        /*
        The JavaScript URL is used to create the JavaScript context for your
        TVMLKit application. Although it is possible to separate your JavaScript
        into separate files, to help reduce the launch time of your application
        we recommend creating minified and compressed version of this resource.
        This will allow for the resource to be retrieved and UI presented to
        the user quickly.
        */
        if let javaScriptURL = NSURL(string: AppDelegate.TVBootURL) {
            appControllerContext.javaScriptApplicationURL = javaScriptURL
        }
        
        appControllerContext.launchOptions["BASEURL"] = AppDelegate.TVBaseURL
        
        if let launchOptions = launchOptions as? [String: AnyObject] {
            for (kind, value) in launchOptions {
                appControllerContext.launchOptions[kind] = value
            }
        }
        
        appController = TVApplicationController(context: appControllerContext, window: window, delegate: self)
        
        return true
    }
    
    // MARK: TVApplicationControllerDelegate
    
    func appController(appController: TVApplicationController, didFinishLaunchingWithOptions options: [String: AnyObject]?) {
        print("\(__FUNCTION__) invoked with options: \(options)")
    }
    
    func appController(appController: TVApplicationController, didFailWithError error: NSError) {
        print("\(__FUNCTION__) invoked with error: \(error)")
    }
    
    func appController(appController: TVApplicationController, didStopWithOptions options: [String: AnyObject]?) {
        print("\(__FUNCTION__) invoked with options: \(options)")
    }
}