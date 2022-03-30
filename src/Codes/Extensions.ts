declare global{
    interface String {
        appendLine(content: string): string;
        append(content: string): string;
    }
}

String.prototype.appendLine = function(content:string): string {
    //let s: string = String(this);
    //let self=this as String;
    return this.concat(content+'\n');
    //s+= content+'\n';
    //this=s;
}

String.prototype.append = function(content:string): string {
    return this.concat(content);
}

export {}
