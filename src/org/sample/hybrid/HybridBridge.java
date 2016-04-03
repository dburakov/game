package org.sample.hybrid;

import android.content.Context;
import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;


public class HybridBridge extends CordovaPlugin {
    public ArrayList itemsList = new ArrayList();
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (action.equals("addItem")) {
                String item = args.getString(0);
                String className = args.getString(1);
                System.err.println("item: " + item);
                System.err.println("className: " + className);
                Context context = cordova.getActivity().getApplicationContext();
                Intent intent = new Intent(context,Class.forName(className));
                itemsList.add(item);
                intent.putStringArrayListExtra("items", itemsList);
                cordova.startActivityForResult(this,intent,1);
                callbackContext.success();
                return true;
            }
            callbackContext.error("Invalid action");
            return false;
        } catch(Exception e) {
            System.err.println("Exception here: " + e.getMessage());
            callbackContext.error(e.getMessage());
            return false;
        }
    }
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        itemsList = data.getStringArrayListExtra("items");
    }

}
