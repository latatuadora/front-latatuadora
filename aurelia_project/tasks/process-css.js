import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import sourcemaps from 'gulp-sourcemaps';
import stylus from 'gulp-stylus';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';
import autoprefixerStylus from 'autoprefixer-stylus';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(sourcemaps.init())
    .pipe(stylus({use: [autoprefixerStylus('last 5 versions')]})).on('error', function(error) {
      console.error(error.message);
      done();
    })
    .pipe(build.bundle());
}
