/* automatically generated by JSCoverage - do not edit */
try {
  if (typeof top === 'object' && top !== null && typeof top.opener === 'object' && top.opener !== null) {
    // this is a browser window that was opened from another window

    if (! top.opener._$jscoverage) {
      top.opener._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null) {
    // this is a browser window

    try {
      if (typeof top.opener === 'object' && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    }
    catch (e) {}

    if (! top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null && top._$jscoverage) {
    _$jscoverage = top._$jscoverage;
  }
}
catch (e) {}
if (typeof _$jscoverage !== 'object') {
  _$jscoverage = {};
}
if (! _$jscoverage['public/javascripts/worker.js']) {
  _$jscoverage['public/javascripts/worker.js'] = [];
  _$jscoverage['public/javascripts/worker.js'][4] = 0;
  _$jscoverage['public/javascripts/worker.js'][5] = 0;
  _$jscoverage['public/javascripts/worker.js'][6] = 0;
  _$jscoverage['public/javascripts/worker.js'][7] = 0;
  _$jscoverage['public/javascripts/worker.js'][8] = 0;
  _$jscoverage['public/javascripts/worker.js'][9] = 0;
  _$jscoverage['public/javascripts/worker.js'][11] = 0;
  _$jscoverage['public/javascripts/worker.js'][12] = 0;
  _$jscoverage['public/javascripts/worker.js'][14] = 0;
  _$jscoverage['public/javascripts/worker.js'][15] = 0;
  _$jscoverage['public/javascripts/worker.js'][17] = 0;
  _$jscoverage['public/javascripts/worker.js'][21] = 0;
  _$jscoverage['public/javascripts/worker.js'][23] = 0;
  _$jscoverage['public/javascripts/worker.js'][28] = 0;
  _$jscoverage['public/javascripts/worker.js'][29] = 0;
  _$jscoverage['public/javascripts/worker.js'][31] = 0;
  _$jscoverage['public/javascripts/worker.js'][32] = 0;
  _$jscoverage['public/javascripts/worker.js'][33] = 0;
}
_$jscoverage['public/javascripts/worker.js'].source = ["<span class=\"c\">/**</span>","<span class=\"c\"> * Created by ellie on 2014-10-20.</span>","<span class=\"c\"> */</span>","<span class=\"k\">function</span> getAll<span class=\"k\">(</span>name<span class=\"k\">)</span> <span class=\"k\">{</span>","    <span class=\"k\">var</span> data <span class=\"k\">=</span> <span class=\"s\">'name='</span> <span class=\"k\">+</span> name<span class=\"k\">;</span>","    <span class=\"k\">try</span> <span class=\"k\">{</span>","        <span class=\"k\">var</span> xhr <span class=\"k\">=</span> <span class=\"k\">new</span> XMLHttpRequest<span class=\"k\">();</span>","        xhr<span class=\"k\">.</span>open<span class=\"k\">(</span><span class=\"s\">'POST'</span><span class=\"k\">,</span> <span class=\"s\">'http://localhost:3000/getall'</span><span class=\"k\">,</span> <span class=\"k\">true</span><span class=\"k\">);</span>","        xhr<span class=\"k\">.</span>setRequestHeader<span class=\"k\">(</span><span class=\"s\">\"Content-Type\"</span><span class=\"k\">,</span>","            <span class=\"s\">\"application/x-www-form-urlencoded\"</span><span class=\"k\">);</span>","        xhr<span class=\"k\">.</span>setRequestHeader<span class=\"k\">(</span><span class=\"s\">\"Content-length\"</span><span class=\"k\">,</span> data<span class=\"k\">.</span>length<span class=\"k\">);</span>","        xhr<span class=\"k\">.</span>setRequestHeader<span class=\"k\">(</span><span class=\"s\">\"Connection\"</span><span class=\"k\">,</span> <span class=\"s\">\"close\"</span><span class=\"k\">);</span>","","        xhr<span class=\"k\">.</span>onreadystatechange <span class=\"k\">=</span> <span class=\"k\">function</span> <span class=\"k\">()</span> <span class=\"k\">{</span>","            <span class=\"k\">if</span> <span class=\"k\">(</span>xhr<span class=\"k\">.</span>readyState <span class=\"k\">==</span> <span class=\"s\">4</span> <span class=\"k\">&amp;&amp;</span> xhr<span class=\"k\">.</span>status <span class=\"k\">==</span> <span class=\"s\">200</span><span class=\"k\">)</span> <span class=\"k\">{</span>","                    <span class=\"c\">//Posting back result</span>","                    postMessage<span class=\"k\">(</span>xhr<span class=\"k\">.</span>responseText<span class=\"k\">);</span>","                <span class=\"k\">}</span>","        <span class=\"k\">}</span><span class=\"k\">;</span>","","        xhr<span class=\"k\">.</span>send<span class=\"k\">(</span>data<span class=\"k\">);</span>","    <span class=\"k\">}</span> <span class=\"k\">catch</span> <span class=\"k\">(</span>e<span class=\"k\">)</span> <span class=\"k\">{</span>","        postMessage<span class=\"k\">(</span><span class=\"k\">null</span><span class=\"k\">);</span>","    <span class=\"k\">}</span>","","<span class=\"k\">}</span>","","self<span class=\"k\">.</span>addEventListener<span class=\"k\">(</span><span class=\"s\">'message'</span><span class=\"k\">,</span> <span class=\"k\">function</span><span class=\"k\">(</span>event<span class=\"k\">)</span> <span class=\"k\">{</span>","    <span class=\"k\">var</span> name <span class=\"k\">=</span> event<span class=\"k\">.</span>data<span class=\"k\">;</span>","    <span class=\"c\">// poll the message service</span>","    getAll<span class=\"k\">(</span>name<span class=\"k\">);</span> <span class=\"c\">// first time we request the messages will be instant, after that we fetch on interval</span>","    setInterval<span class=\"k\">(</span> <span class=\"k\">function</span><span class=\"k\">()</span> <span class=\"k\">{</span>","        getAll<span class=\"k\">(</span>name<span class=\"k\">);</span>","    <span class=\"k\">}</span><span class=\"k\">,</span> <span class=\"s\">5000</span><span class=\"k\">);</span>","<span class=\"k\">}</span><span class=\"k\">);</span>",""];
_$jscoverage['public/javascripts/worker.js'][4]++;
function getAll(name) {
  _$jscoverage['public/javascripts/worker.js'][5]++;
  var data = ("name=" + name);
  _$jscoverage['public/javascripts/worker.js'][6]++;
  try {
    _$jscoverage['public/javascripts/worker.js'][7]++;
    var xhr = new XMLHttpRequest();
    _$jscoverage['public/javascripts/worker.js'][8]++;
    xhr.open("POST", "http://localhost:3000/getall", true);
    _$jscoverage['public/javascripts/worker.js'][9]++;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    _$jscoverage['public/javascripts/worker.js'][11]++;
    xhr.setRequestHeader("Content-length", data.length);
    _$jscoverage['public/javascripts/worker.js'][12]++;
    xhr.setRequestHeader("Connection", "close");
    _$jscoverage['public/javascripts/worker.js'][14]++;
    xhr.onreadystatechange = (function () {
  _$jscoverage['public/javascripts/worker.js'][15]++;
  if (((xhr.readyState == 4) && (xhr.status == 200))) {
    _$jscoverage['public/javascripts/worker.js'][17]++;
    postMessage(xhr.responseText);
  }
});
    _$jscoverage['public/javascripts/worker.js'][21]++;
    xhr.send(data);
  }
  catch (e) {
    _$jscoverage['public/javascripts/worker.js'][23]++;
    postMessage(null);
  }
}
_$jscoverage['public/javascripts/worker.js'][28]++;
self.addEventListener("message", (function (event) {
  _$jscoverage['public/javascripts/worker.js'][29]++;
  var name = event.data;
  _$jscoverage['public/javascripts/worker.js'][31]++;
  getAll(name);
  _$jscoverage['public/javascripts/worker.js'][32]++;
  setInterval((function () {
  _$jscoverage['public/javascripts/worker.js'][33]++;
  getAll(name);
}), 5000);
}));
