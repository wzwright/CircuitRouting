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
	static isComponent(t){
		return t===this.body||t===this.edge||t===this.wiredEdge;
	}
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
function pointDist(a,b){
	return Math.sqrt(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2));
}
function sameComponents(w1,w2){
	var w1f=mod.elements[w1[0][0]][w1[0][1]].compId; //w1 first
	var w1l=mod.elements[w1[w1.length-1][0]][w1[w1.length-1][1]].compId; //w1 last
	var w2f=mod.elements[w2[0][0]][w2[0][1]].compId;
	var w2l=mod.elements[w2[w2.length-1][0]][w2[w2.length-1][1]].compId;
	return (w1f==w2f&&w1l==w2l)||(w1f==w2l&&w1l==w2f);
}

function powerMean(data,p){
	return Math.pow(sum(data.map(x=>Math.pow(x,p)))/data.length,1/p);
}
function sum(data){
	return data.reduce((a,b)=>a+b,0);
}
function wireMean(w){
	var xSum=0;
	var ySum=0;
	for(var p in w){
		xSum+=w[p][0];
		ySum+=w[p][1];
	}
	return([xSum/w.length,ySum/w.length]);
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