import gulp from 'gulp';
import merge from 'merge-stream';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import gulpCleanCss from 'gulp-clean-css';
import gulpConcatCss from 'gulp-concat-css';

export default function copyDependenciesFiles() {
  const sources = [
    {
      lib: 'node_modules/font-awesome',
      main: '/css/font-awesome.css',
      fonts: '/fonts/*'
    },
    {
      lib: 'node_modules/normalize.css',
      main: '/normalize.css'
    },
    {
      lib: 'node_modules/nouislider',
      main: '/distribute/nouislider.min.css'
    },
    {
      lib: 'node_modules/tippy.js',
      main: '/dist/tippy.css'
    }
  ];
  let cssSources = [];
  let fontSources = [];

  sources.forEach(source => {
    cssSources.push(source.lib + source.main);
    if (source.fonts) {
      fontSources.push(source.lib + source.fonts);
    }
  });

  const taskCss = gulp.src(cssSources)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulpConcatCss('libs.css', { rebaseUrls: false }))
    .pipe(gulpCleanCss())
    .pipe(gulp.dest(`${project.platform.output}/styles`));

  const taskFonts = gulp.src(fontSources)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(`${project.platform.output}/fonts`));

  return merge(taskCss, taskFonts);
}