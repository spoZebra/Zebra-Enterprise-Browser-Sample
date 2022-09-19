
    var printers = [];
    var selectedPrinter;    
    
    function onSelectedPrinter(instance){
        selectedPrinter = EB.PrinterZebra.getPrinterByID(instance.id);
        console.log(instance);
        setTimeout(() => { document.getElementById("connectButton").disabled = false;}, 20);
    }   
    function searchPrinters(){
        // disable buttons
        setTimeout(() => { document.getElementById("searchButton").innerHTML =`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Searching...`},20); 
        setTimeout(() => { document.getElementById("connectButton").disabled = true;},20);
        $('.list-group').empty(); // update view
        // reset list
        printers = [];
        try{
            EB.Printer.searchPrinters({ 
                connectionType:EB.Printer.CONNECTION_TYPE_BLUETOOTH,  
                printerType: EB.Printer.PRINTER_TYPE_ZEBRA
            }, searchPrinterResultCallback);
            EB.Printer.searchPrinters({ 
                connectionType:EB.Printer.CONNECTION_TYPE_TCP,  
                printerType: EB.Printer.PRINTER_TYPE_ZEBRA
            }, searchPrinterResultCallback);
        }
        catch (e) {
            triggerToast("An error occurred loading printers");
            console.log(e)
        }
        finally{
            setTimeout(() => { document.getElementById("searchButton").disabled = false; searchButton.innerHTML =`<span> Search Printers</span>`},20);
        }
    }   
    function searchPrinterResultCallback(cb) {
        if(cb.status == 'PRINTER_STATUS_SUCCESS')
        {
            if (typeof cb.printerID != "undefined")
            {
                console.log('Found: ' + cb.printerID)
                var printerInstance = EB.PrinterZebra.getPrinterByID(cb.printerID);
                var devName = printerInstance.deviceName + " (" + printerInstance.connectionType.replace('CONNECTION_TYPE_', '') +")";
                
                if(devName == null){
                    var printerType = printerInstance.printerType.replace('PRINTER_TYPE_', '');
                    var connType = printerInstance.connectionType.replace('CONNECTION_TYPE_', '');
                    devName = printerType + '-' + connType + '@' + printerInstance.deviceAddress;
                }   
                // Add to list
                setTimeout(() => {
                    $('.list-group').append(`<a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#list-${cb.printerID}" 
                    role="tab" aria-controls="list-profile" onClick="onSelectedPrinter(${cb.printerID})" id=${cb.printerID}>${devName}</a>`)}, 20)
                printers.push(cb.printerID);    
            }
            else
            {
                triggerToast("Search completed");
            }
        }
        else
        {
            console.log(cb.status);
        }
    }   


    // Connect
    function connect()
    {
        var connectButton = document.getElementById('connectButton');
        setTimeout(() => { connectButton.innerHTML =`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Connecting...`},20); 
        selectedPrinter.connect(connect_callback)
    }   
    function connect_callback(cb) {
        triggerToast(cb)
        var value = prompt("Print something", "");
        if(value == '')
            value == 'Test' 
        var connectButton = document.getElementById('connectButton');
        setTimeout(() => { connectButton.innerHTML =`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Printing...`},20);    
        selectedPrinter.printRawString('^XA^FO50,50^ADN,36,20^FD     '+ value + ' ^FS^XZ',{},print_callback)
    }   
    function print_callback(cb) {
        triggerToast(cb)
        var connectButton = document.getElementById('connectButton');
        setTimeout(() => { connectButton.innerHTML =`<span>Connect and print</span>`},20);
    }   



    // Common
    function quitAndClear(){
    	EB.WebView.clearApplicationCache();
    	EB.Application.quit()
    }   
    function triggerToast(message){
    	var toastLiveExample = document.getElementById('liveToast')
    	var toast = new bootstrap.Toast(toastLiveExample)
    	var label = document.getElementById('toast-text')  
    	label.innerHTML = message;
    	toast.show()
    }