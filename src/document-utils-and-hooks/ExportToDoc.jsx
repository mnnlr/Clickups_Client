import React from 'react'

export const ExportToDoc = ({ selectedDocContent }) => {
    const content = selectedDocContent;
    const convertedContent = `<html><body>${content}</body></html>`;

    const blob = new Blob([convertedContent], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.docx';
    link.click();
}
