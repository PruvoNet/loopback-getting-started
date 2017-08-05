'use strict';

module.exports = function(Note) {

  Note.prototype.archive = function (cb) {
    var note = this;
    console.log('archving note', note.id);
    var delta = {archived: true};
    note.patchAttributes(delta)
      .then(function () {
        return cb();
      })
      .catch(function (err) {
        var errToSend = new Error();
        errToSend.status = 500;
        errToSend.message = 'Failed archiving note';
        return cb(errToSend);
      });
  };
  Note.remoteMethod(
    'archive',
    {isStatic: false}
  );

};
