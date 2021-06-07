import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import WFS from 'ol/format/WFS';

proj4.defs(
  'EPSG:2056',
  '+proj=somerc \
    +lat_0=46.95240555555556 +lon_0=7.439583333333333 \
    +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel \
    +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
);
register(proj4);

function fakeRequest(fileName) {
  const url = `https://raw.githubusercontent.com/msch-alpgis/js-e5njpe/master/assets/${fileName}`;
  fetch(url)
    .then(response => response.text())
    .then(xml => {

      const parser = new WFS({
        featureNS: 'http://mapserver.gis.umn.edu/mapserver',
        featureType: ['Liegenschaften', 'LFP3a'],
        version: '2.0.0'
      });
      const features = parser.readFeatures(xml);

      const resultEle = document.getElementById('result');
      let result = 'Expected features: ' + (fileName === 'single.xml' ? 1 : 2);
      result += '\nRead features: ' + features.length;
      resultEle.innerHTML = result;
    });
}

document.getElementById('single').addEventListener('click', _ => {
  fakeRequest('single.xml');
});

document.getElementById('multi').addEventListener('click', _ => {
  fakeRequest('multi.xml');
});
