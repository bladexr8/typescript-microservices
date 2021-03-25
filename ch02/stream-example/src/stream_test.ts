import { finished } from "node:stream";
import { FilterTransform } from "./filter_stream";

// we create an object of our custom transformation
// and pass phone and email as sensitive properties
let filter = new FilterTransform(['phone', 'email']);

// create a readable stream that reads the transformed objects
const filteredChunks: Array<String> = [];
filter.on('readable', function() { 
    console.log("readable Event...");
    //console.log("Transformation:-", filter.read()); 
    let chunk;
    while(null !== (chunk = filter.read())) {
        filteredChunks.push(chunk);
    }
    console.log(filteredChunks);
});

/* filter.on('finish', function() {
    const content = filteredChunks.join('');
    console.log(`Transformed Stream = ${filteredChunks}`);
}); */

// create a writable stream that writes data to get it transformed
console.log("Filter 01...");
filter.write({ name: 'Parth', phone: 'xxxxx-xxxxx', email: 'ghiya.parth@gmail.com', id: 1 });
console.log("Filter 02...");
filter.write({ name: 'Dhruvil', phone: 'xxxxx-xxxxx', email: 'dhruvil.thaker@gmail.com', id: 2 });
console.log("Filter 03...");
filter.write({ name: 'Dhaval', phone: 'xxxxx-xxxxx', email: 'dhaval.marthak@gmail.com', id: 3 });
console.log("Filter 04...");
filter.write({ name: 'Shruti', phone: 'xxxxx-xxxxx', email: 'shruti.patel@gmail.com', id: 4 });
console.log("Filter End...");
filter.end();

