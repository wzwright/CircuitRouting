class Modes{
	static get normal(){return "normal";}
	static get wiring(){return "wiring";}
	static get wire(){return "wire";}
	static get component(){return "component";}
}
class Types{
	static get body(){return "body";}
	static get edge(){return "edge";}
	static get horiz(){return "horiz";}
	static get vert(){return "vert";}
	static get corner(){return "corner";}
	static get cross(){return "cross";}
	static get wiredEdge(){return "wiredEdge";}

	static isWire(t){
		return t===this.horiz||t===this.vert||t===this.cross||t===this.corner;
	}
}

/*var factorial=(function(){
    var f=[1,1];
    return function(n){
        if (f[n])
            return f[n];
        return f[n] = factorial(n-1) * n;
    }
})();*/

function pointEq(a,b){
    return a[0]==b[0]&&a[1]==b[1];
}

function plusMinusBinomRand(n,p){ //reflects distribution across 0
    return binomRand(n,p)*(Math.round(Math.random())*2-1)
}
function binomRand(n,p){
    var count=0;
    for(var i=0;i<n;i++){
        if(Math.random()<=p)
            count++;
    }
    return count;
}
function uniformRand(n){
    return Math.floor(Math.random()*n);
}

function cantorPair(x,y){ //Cantor pairing function
    return (x+y)*(x+y+1)/2+y;
}

class Node{ //search node
	constructor(parent, state, f) {
		this.parent = parent;
		this.state = state;
		this.f=f

		if(parent==null)
			this.cost=0;
		else
			this.cost=parent.cost+1; //all wires have the same cost here
	}
	static compare(a,b){
		return a.cost+a.f-b.cost-b.f;
	}
}


//bin heap priority queue borrowed from tinyqueue project by mourner on github
function TinyQueue(data, compare) { 
    if (!(this instanceof TinyQueue)) return new TinyQueue(data, compare);

    this.data = data || [];
    this.length = this.data.length;
    this.compare = compare || defaultCompare;

    if (this.length > 0) {
        for (var i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
    }
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}