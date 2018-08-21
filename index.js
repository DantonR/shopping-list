const http = require('http');
const fs  = require('fs');
const path = require('path');


// ─── SERVER START ───────────────────────────────────────────────────────────────
var server = http.createServer(function(request, response){
    console.log(`${request.method} request for ${request.url}`);

    
    // ─── GET IF STATEMENT ───────────────────────────────────────────────────────────
    //
    if (request.method === 'GET'){

        
        // index request
        if(request.url === "/" || request.url === '/home' || request.url === '/index' || request.url === '/index.html'){
            fs.readFile('./public/index.html', 'UTF-8', function(error, contents){
                if (error) {
                    console.log('error');
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(contents)
                } // error if statment ends
                    
            }); // read file func ends
        } // index request end

        
        // js request
        else if(request.url.match(/.js$/)){
            var jsPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(jsPath, 'UTF-8');
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            fileStream.pipe(response);
        } // js request end


        // js request
        else if(request.url.match(/.css$/)){
            var cssPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(cssPath, 'UTF-8');
            response.writeHead(200, {'Content-Type': 'text/css'});
            fileStream.pipe(response);
        } // js request end
        
    }
    //
    // ───────────────────────────────────────────────────── GET IF STATEMENT END ─────

        
    

        

    
    
}); // var server end
// ─────────────────────────────────────────────────────────────── SERVER END ─────

server.listen(3000);




    
