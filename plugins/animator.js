// animator.js: Demo animator controller
// Scott Schiller | schillmania.com | May 2009
// -------------------------------------------
// Provided free, "as-is", for any use. No warranty or support.
// http://www.schillmania.com/projects/javascript-animation-3/

writeDebug = (typeof console != 'undefined' && console.log && window.location.href.match(/debug=1/i))?function(sDebug) {
    // use #debug=1 etc. in URL to enable debug output for console.log()-supported shiz
    console.log(sDebug);
}:function() {
    // oh well
}

function Animator() {
    var self = this;
    var intervalRate = 1000/60;
    this.tweenTypes = {
        'default': [10,10,10,10,10,10,10,10,10,10],
        'blast': [12,12,11,10,10,9,8,7,6,5,4,3,2,1],
        'linear': [10,10,10,10,10,10,10,10,10,10]
    }
    this.queue = [];
    this.queueHash = [];
    this.active = false;
    this.timer = null;
    this.createTween = function(start,end,type) {
        // return array of tween coordinate data (start->end)
        type = type||'default';
        var tween = [start];
        var tmp = start;
        var diff = end-start;
        var x = self.tweenTypes[type].length;
        for (var i=0; i<x; i++) {
            tmp += diff*self.tweenTypes[type][i]*0.01;
            tween[i] = {};
            tween[i].data = tmp;
            tween[i].event = null;
        }
        return tween;
    }

    this.enqueue = function(o,fMethod,fOnComplete) {
        // add object and associated methods to animation queue
        writeDebug('animator.enqueue()');
        if (!fMethod) {
            writeDebug('animator.enqueue(): missing fMethod');
        }

        self.queue.push(o);
        o.active = true;
    }

    this.animate = function() {
        var active = 0;
        for (var i=0,j=self.queue.length; i<j; i++) {
            if (self.queue[i].active) {
                self.queue[i].animate();
                active++;
            }
        }
        if (active == 0 && self.timer) {
            self.stop();
        } else {
            // writeDebug(active+' active');
        }
    }

    this.start = function() {
        if (self.timer || self.active) {
            writeDebug('animator.start(): already active');
            return false;
        }
        writeDebug('animator.start()'); // report only if started
        self.active = true;
        self.timer = setInterval(self.animate,intervalRate);
    }

    this.stop = function() {
        writeDebug('animator.stop()',true);
        // reset some things, clear for next batch of animations
        clearInterval(self.timer);
        self.timer = null;
        self.active = false;
        self.queue = [];
    }

}

var animator = new Animator();

function Animation(oParams) {
    // unique animation object
    /*
     oParams = {
     from: 200,
     to: 300,
     tweenType: 'default',
     ontween: function(value) { ... }, // method called each time
     oncomplete: function() { ... } // when finished
     }
     */
    var self = this;
    if (typeof oParams.tweenType == 'undefined') {
        oParams.tweenType = 'default';
    }
    this.ontween = (oParams.ontween||null);
    this.oncomplete = (oParams.oncomplete||null);
    this.tween = animator.createTween(oParams.from,oParams.to,oParams.tweenType);
    this.frameCount = animator.tweenTypes[oParams.tweenType].length;
    this.frame = 0;
    this.active = false;

    this.animate = function() {
        // generic animation method
        if (self.active) {
            if (self.ontween && self.tween[self.frame]) {
                self.ontween(self.tween[self.frame].data);
            }
            if (self.frame++ >= self.frameCount-1) {
                writeDebug('animation(): end');
                self.active = false;
                self.frame = 0;
                if (self.oncomplete) {
                    self.oncomplete();
                    // self.oncomplete = null;
                }
                return false;
            }
            return true;
        }
        return false;
    }

    this.start = function() {
        // add this to the main animation queue
        animator.enqueue(self,self.animate,self.oncomplete);
        if (!animator.active) {
            animator.start();
        }
    }

    this.stop = function() {
        self.active = false;
    }

}