import React from 'react';
import Modal from 'components/Modal';
import { deleteRecord } from 'features/call-records/store';
import { ICallRecord } from 'features/call-records/types';
import { connect } from 'react-redux';

import './index.scss';

interface IContextMenuProps {
  record?: ICallRecord;
  onClose: () => void;
  deleteRecord: (id: number) => void;
}

const ContextMenu = ({ record, onClose, deleteRecord }: IContextMenuProps) => {
  const downloadAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    record && download(record.record.file);
  };

  const downloadText = (e: React.MouseEvent) => {
    e.stopPropagation();
    record &&
      downloadData(
        JSON.stringify(record.record.transcriptions, null, 2),
        'application/json'
      );
  };

  return (
    <Modal isOpened={!!record} onClose={onClose}>
      <div className="records-list__modal">
        <button
          className="records-list__modal-button"
          onClick={downloadAudio}
          data-test-id="call-records-list/item/delete"
        >
          Download
        </button>
        <button
          className="records-list__modal-button"
          onClick={downloadText}
          data-test-id="call-records-list/item/delete"
        >
          Download Only Text
        </button>
        <button
          className="records-list__modal-button records-list__modal-button--delete"
          onClick={e => {
            e.stopPropagation();
            if (record) {
              deleteRecord(record.id);
              onClose();
            }
          }}
          data-test-id="call-records-list/item/delete"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

function download(url: string, fileName?: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName || 'file';
  link.click();
}

function downloadData(data: string, mimeType: string) {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  console.log(url);
  download(url);
}

export default connect(null, { deleteRecord })(ContextMenu);
