import { useEffect, useRef, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const CustomInvoice = ({ invoiceData }: any) => {
  const [pdfGenerated, setPdfGenerated] = useState(false)
  let total = 0
  const invoiceContainer = useRef(null)

  useEffect(() => {
    // Generate PDF only if it has not been generated before
    if (!pdfGenerated) {
      setPdfGenerated(true)
    }
  }, [pdfGenerated])

  const generatePDF = async () => {
    // Ensure the invoiceContainer is not null before proceeding
    if (!invoiceContainer.current) {
      console.error('Invoice container element not found')
      return
    }

    const pdf = new jsPDF('portrait', 'pt', 'a4')
    const data = await html2canvas(invoiceContainer.current)
    const img = data.toDataURL('image/png')
    const imgProperties = pdf.getImageProperties(img)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('invoice.pdf')
  }
  // generatePDF()

  return (
    <section className="py-20 relative">
      <div ref={invoiceContainer} id="invoice-container">
        <div className="py-20 relative w-[70vw]">
          <div className="container relative">
            <div className="rounded-3xl bg-white p-12">
              <div className="flex flex-wrap items-center justify-between gap-6 mb-4">
                <h2 className="text-2xl font-semibold">Invoice</h2>
                <img src="favicon.png" alt="" width={90} height={120} />
              </div>
              <hr />
              <div className="flex flex-wrap items-center justify-between gap-6 py-4">
                <h5 className="text-base font-normal">
                  <span className="font-bold">Date:</span> 05/12/2020
                </h5>
                <h5 className="text-base font-normal">
                  <span className="font-bold">Invoice No:</span> {invoiceData.id}
                </h5>
              </div>
              <hr />
              <div className="flex flex-wrap items-center justify-between gap-6 mt-4">
                <div>
                  <h4 className="text-base font-bold">Invoice To:</h4>
                  <p className="font-sm font-normal">
                    {invoiceData.Addresses?.street}
                    <br />
                    {invoiceData.Addresses?.city}
                    <br />
                    {invoiceData.Addresses?.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="border-collapse table-auto w-full text-sm mt-14 mb-12 whitespace-pre">
                  <thead>
                    <tr className="bg-gray-300 text-black text-center">
                      <th className="p-4 uppercase text-base font-semibold border-s-2 border-white">
                        Item Description
                      </th>
                      <th className="p-4 uppercase text-base font-semibold border-s-2 border-white">
                        Price
                      </th>
                      <th className="p-4 uppercase text-base font-semibold border-s-2 border-white">
                        Qty
                      </th>
                      <th className="p-4 uppercase text-base font-semibold border-s-2 border-white">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {invoiceData.order_list.map((order: any, index: any) => {
                      total += total + parseInt(order.Products.price_cell) * parseInt(order.amount)
                      return (
                        <tr className="text-center" key={index}>
                          <td className="p-5 text-base font-medium border-s-2 border-white">
                            {order.Products.titleEn}
                          </td>
                          <td className="p-5 text-base font-medium border-s-2 border-white">
                            ${order.Products.price_cell}
                          </td>
                          <td className="p-5 text-base font-medium border-s-2 border-white">
                            {order.amount}
                          </td>
                          <td className="p-5 text-base font-medium border-s-2 border-white">
                            ${parseInt(order.Products.price_cell) * parseInt(order.amount)}
                          </td>
                        </tr>
                      )
                    })}

                    <tr>
                      <td className="p-4 pb-0 border border-white text-base font-normal text-end">
                        <span className="pe-12 font-bold">Sub Total:</span>${total}
                      </td>
                    </tr>
                    <tr>
                      <td className="pe-5 border border-white text-base font-normal text-end">
                        <span className="pe-12 font-bold">Total:</span>$2365.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap justify-between gap-6 mt-28">
                <div>
                  <span className="text-lg font-bold">Payment Info:</span>
                  <p className="text-sm font-medium pt-2">
                    Account No: <span className="font-bold">Credit</span>
                  </p>
                  <p className="text-sm font-medium">
                    Name: <span className="font-bold">Lorem Ipsum</span>
                  </p>
                  <p className="text-sm font-medium">
                    Bank Account: <span className="font-bold">0123 456 7890</span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-5">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        className="w-10 h-10 text-red-600"
                      >
                        <path
                          fill="currentcolor"
                          d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"
                        />
                      </svg>
                    </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        className="w-10 h-10 text-red-600"
                      >
                        <path
                          fill="currentcolor"
                          d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
                        />
                      </svg>
                    </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        className="w-10 h-10 text-red-600"
                      >
                        <path
                          fill="currentcolor"
                          d="M407.4 32H40.6C18.2 32 0 50.2 0 72.6v366.8C0 461.8 18.2 480 40.6 480h366.8c22.4 0 40.6-18.2 40.6-40.6V72.6c0-22.4-18.2-40.6-40.6-40.6zM176.1 145.6c.4 23.4-22.4 27.3-26.6 27.4-14.9 0-27.1-12-27.1-27 .1-35.2 53.1-35.5 53.7-.4zM332.8 377c-65.6 0-34.1-74-25-106.6 14.1-46.4-45.2-59-59.9.7l-25.8 103.3H177l8.1-32.5c-31.5 51.8-94.6 44.4-94.6-4.3.1-14.3.9-14 23-104.1H81.7l9.7-35.6h76.4c-33.6 133.7-32.6 126.9-32.9 138.2 0 20.9 40.9 13.5 57.4-23.2l19.8-79.4h-32.3l9.7-35.6h68.8l-8.9 40.5c40.5-75.5 127.9-47.8 101.8 38-14.2 51.1-14.6 50.7-14.9 58.8 0 15.5 17.5 22.6 31.8-16.9L386 325c-10.5 36.7-29.4 52-53.2 52z"
                        />
                      </svg>
                    </span>
                  </div>
                  <p className="text-sm font-medium uppercase tracking-widest mt-5">
                    www.Yourwebsite.com
                  </p>
                  <p className="text-sm font-medium uppercase tracking-widest mt-1">
                    Youreamil@email.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </section>
  )
}

export default CustomInvoice
