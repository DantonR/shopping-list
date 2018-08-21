const http = require('http');
const fs  = require('fs');
const path = require('path');
// const data = require('./data/products');
const qs = require('querystring');


// ─── SERVER START ───────────────────────────────────────────────────────────────
var server = http.createServer(function(request, response){
    console.log(`${request.method} request for ${request.url}`);

    
    // ─── GET ───────────────────────────────────────────────────────────
    //
    if (request.method === 'GET'){

        
        // index request
        if(request.url === '/' || request.url === '/home' || request.url === '/index' || request.url === '/index.html'){
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
    // ───────────────────────────────────────────────────── GET  END ─────


    //
    // ─── POST ───────────────────────────────────────────────────────────────────────
    //
    else if (request.method === 'POST') {
        
        
        if (request.url === '/submitForm') {
            var body = '';
            request.on('data', function(data){
                body += data;
            })

            request.on('end', function(){

            });
            console.log('working');

            request.on('end', function(){
                var formData = qs.parse(body);
                console.log(formData);
                response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            });
            
            // var content = 'some text'
            // fs.appendFile('./data/items.json', content, function(err){
            //     if (err){
            //         console.log('error in appending data')
            //     } else {
            //         console.log('content was appended');
            //         console.log(content.value)
            //     }
            // });
        }
    }
    //
    // ───────────────────────────────────────────────────────────────── POST END ─────
    //

        

        

        
    

        

    
    
}); // var server end
// ─────────────────────────────────────────────────────────────── SERVER END ─────

server.listen(3000);




    
