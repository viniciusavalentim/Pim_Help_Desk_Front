import { getCategoryInPortuguese, getPriorityInPortuguese } from "@/helper/enums"
import { getDate } from "@/pages/app/requester/dashboard"
import { Ticket } from "@/utils/types"

export function exportToPDF(tickets: Ticket[], filename = "tickets-report") {
  // Create PDF content using a table layout
  const pageWidth = 210 // A4 width in mm
  const pageHeight = 297 // A4 height in mm
  const margin = 10
  const contentWidth = pageWidth - margin * 2

  // Calculate column widths
  const columns = ["ID", "Solicitante", "Título", "Descrição", "Data", "Categoria", "Prioridade"]
  const colWidth = contentWidth / columns.length

  // Build PDF content
  const pdfContent = `%PDF-1.4
        1 0 obj
        << /Type /Catalog /Pages 2 0 R >>
        endobj
        2 0 obj
        << /Type /Pages /Kids [3 0 R] /Count 1 >>
        endobj
        3 0 obj
        << /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth * 2.83} ${pageHeight * 2.83}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
        endobj
        4 0 obj
        << /Length ${calculatePdfLength(tickets, columns)} >>
        stream
        BT
        /F1 12 Tf
        50 ${pageHeight * 2.83 - 50} Td
        (Relatório de Tickets) Tj
        0 -30 Td
        /F1 10 Tf
        `
  const htmlContent = generateHTMLTable(tickets, columns)

  const element = document.createElement("div")
  element.innerHTML = htmlContent
  element.style.display = "none"
  document.body.appendChild(element)

  // Use browser's print function
  const iframe = document.createElement("iframe")
  iframe.style.display = "none"
  document.body.appendChild(iframe)

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
  if (iframeDoc) {
    iframeDoc.open()
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${filename}</title>
        <style>
          * { margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; margin-bottom: 20px; font-size: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #1f2937; color: white; padding: 12px; text-align: left; font-weight: 600; font-size: 12px; }
          td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 11px; }
          tr:nth-child(even) { background-color: #f9fafb; }
          tr:hover { background-color: #f3f4f6; }
          .priority-baixa { background-color: #dbeafe; color: #1e40af; }
          .priority-média { background-color: #fef3c7; color: #92400e; }
          .priority-alta { background-color: #fee2e2; color: #991b1b; }
          .priority-crítica { background-color: #e9d5ff; color: #581c87; }
          .stars { color: #fbbf24; }
          @media print {
            body { margin: 0; padding: 10px; }
            table { font-size: 10px; }
            th, td { padding: 8px; }
          }
        </style>
      </head>
      <body>
        <h1>Relatório de Tickets</h1>
        <p style="text-align: center; color: #666; margin-bottom: 20px;">Gerado em ${new Date().toLocaleDateString("pt-BR")}</p>
        ${htmlContent}
      </body>
      </html>
    `)
    iframeDoc.close()

    // Trigger print dialog which allows saving as PDF
    setTimeout(() => {
      iframe.contentWindow?.print()
      document.body.removeChild(iframe)
    }, 250)
  }

  document.body.removeChild(element)
}

function generateHTMLTable(tickets: Ticket[], columns: string[]): string {
  const headerRow = columns.map((col) => `<th>${col}</th>`).join("")

  const rows = tickets
    .map((ticket) => {
      const priorityClass = `priority-${ticket.priority}`
      return `
        <tr>
          <td>#${ticket.id.slice(0, 4)}</td>
          <td>${ticket.requester?.name}</td>
          <td>${ticket.title}</td>
          <td>${ticket.description}</td>
          <td>${getDate(ticket.createdAt)}</td>
          <td>${getCategoryInPortuguese(ticket.category)}</td>
          <td><span class="${priorityClass}" style="padding: 4px 8px; border-radius: 4px; display: inline-block;">${getPriorityInPortuguese(ticket.priority)}</span></td>
        </tr>
      `
    })
    .join("")

  return `<table>${headerRow}${rows}</table>`
}

function calculatePdfLength(tickets: Ticket[], columns: string[]): number {
  return tickets.length * 100 + columns.length * 50
}
