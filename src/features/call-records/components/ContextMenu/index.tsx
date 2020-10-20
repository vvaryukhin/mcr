import React from 'react';
import BottomMenu from 'components/BottomMenu';
import { deleteRecord } from 'features/call-records/store';
import { ICallRecord } from 'features/call-records/types';
import { connect } from 'react-redux';

interface IContextMenuProps {
  record?: ICallRecord;
  onClose: () => void;
  deleteRecord: (id: number) => void;
}

const ContextMenu = ({ record, onClose, deleteRecord }: IContextMenuProps) => {
  const onDownloadAudio = () => {
    record && download(record.record.file);
  };

  const onDownloadText = () => {
    record &&
      downloadData(
        JSON.stringify(record.record.transcriptions, null, 2),
        'application/json'
      );
  };

  const onDeleteRecord = () => {
    record && deleteRecord(record.id);
    onClose();
  };

  return (
    <BottomMenu
      isOpened={!!record}
      onClose={onClose}
      items={[
        { title: 'Download', onClick: onDownloadAudio },
        { title: 'Download Text', onClick: onDownloadText },
        { title: 'Delete', onClick: onDeleteRecord, theme: 'danger' },
      ]}
    />
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

const mapDispatchToProps = {
  deleteRecord,
};

export default connect(null, mapDispatchToProps)(ContextMenu);
