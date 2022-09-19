

    function quitAndClear(){
    	EB.WebView.clearApplicationCache();
    	EB.Application.quit()
    }   

	function fnScanEnable() { 
    	EB.Barcode.enable({allDecoders:true},fnBarcodeScanned); 
		// LM Config
		/*EB.Barcode.allDecoders = false; 
		EB.Barcode.code128 = true;
		EB.Barcode.code128ean128 = false;
		EB.Barcode.code128other128 = true;
		EB.Barcode.picklistEx = "disabled";
		EB.Barcode.picklistMode = "disabled";
		EB.Barcode.scanMode = "SINGLE_BARCODE";
		EB.Barcode.setAimType(EB.Barcode.AIMTYPE_CONTINUOUS_READ);
		EB.Barcode.setSameSymbolTimeout(2500);
		EB.Barcode.setDifferentSymbolTimeout(500);*/

		EB.Barcode.allDecoders = false;
		EB.Barcode.code128 = true;
		EB.Barcode.code128ean128 = false;
		EB.Barcode.code128other128 = true;
		EB.Barcode.picklistEx = "disabled";
		EB.Barcode.picklistMode = "disabled";
		EB.Barcode.scanMode = "SINGLE_BARCODE";
		EB.Barcode.setAimType(EB.Barcode.AIMTYPE_CONTINUOUS_READ);
		EB.Barcode.setSameSymbolTimeout(2500);
		EB.Barcode.setDifferentSymbolTimeout(500);
		
		// EB.Barcode.setPicklistMode(EB.Barcode.PICKLIST_HARDWARE_RETICLE)
		// EB.Barcode.aimType = EB.Barcode.AIMTYPE_CONTINUOUS_READ;
		// EB.Barcode.scanMode = EB.Barcode.SCANMODE_MULTI_BARCODE;
		// EB.Barcode.instantReporting = true;

        // EB.Barcode.code39convertToCode32 = true;
    	// EB.Barcode.code39code32Prefix = true;   
		setTimeout(() => { document.getElementById("enableButton").disabled = true;},20);
		setTimeout(() => { document.getElementById("disableButton").disabled = false;},20);
    	triggerToast("Scanner enabled");   
    }
    
    function fnScanDisable() { 
    	EB.Barcode.disable(); 
		setTimeout(() => { document.getElementById("enableButton").disabled = false;},20);
		setTimeout(() => { document.getElementById("disableButton").disabled = true;},20);
    	triggerToast("Scanner disabled");   
    }
    function fnBarcodeScanned(decodedBarcode) {	
    	var dataEl = document.getElementById('barcode-data')  
    	var sourceEl = document.getElementById('barcode-source')
    	var typeEl = document.getElementById('barcode-type')  
    	var timeEl = document.getElementById('barcode-time')  
    
    	dataEl.innerHTML = decodedBarcode.data;
    	sourceEl.innerHTML = decodedBarcode.source;
    	typeEl.innerHTML = decodedBarcode.type;
    	timeEl.innerHTML = decodedBarcode.time;
    
    }   
    function triggerToast(message){
    	var toastLiveExample = document.getElementById('liveToast')
    	var toast = new bootstrap.Toast(toastLiveExample)
		
    	var label = document.getElementById('toast-text')  
    	label.innerHTML = message;
    	toast.show()
    }
