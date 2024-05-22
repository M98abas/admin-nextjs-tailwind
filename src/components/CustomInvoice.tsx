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
    <section className="relative py-20">
      <div ref={invoiceContainer} id="invoice-container">
        <div className="py-20 relative w-[70vw]">
          <div className="container relative">
            <div className="p-12 bg-white rounded-3xl">
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
                  <p className="font-normal font-sm">
                    {invoiceData.Addresses?.district} - {invoiceData.Addresses?.street}
                    <br />
                    {invoiceData.Addresses?.city}
                    <br />
                    {invoiceData.Addresses?.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full mb-12 text-sm whitespace-pre border-collapse table-auto mt-14">
                  <thead>
                    <tr className="text-center text-black bg-gray-300">
                      <th className="p-4 text-base font-semibold uppercase border-white border-s-2">
                        Item Description
                      </th>
                      <th className="p-4 text-base font-semibold uppercase border-white border-s-2">
                        Price
                      </th>
                      <th className="p-4 text-base font-semibold uppercase border-white border-s-2">
                        Qty
                      </th>
                      <th className="p-4 text-base font-semibold uppercase border-white border-s-2">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {invoiceData.order_list.map((order: any, index: any) => {
                      total += total + parseInt(order.Products.price_cell) * parseInt(order.amount)
                      return (
                        <tr className="text-center" key={index}>
                          <td className="p-5 text-base font-medium border-white border-s-2">
                            {order.Products.titleEn}
                          </td>
                          <td className="p-5 text-base font-medium border-white border-s-2">
                            IQD {order.Products.price_cell}
                          </td>
                          <td className="p-5 text-base font-medium border-white border-s-2">
                            {order.amount}
                          </td>
                          <td className="p-5 text-base font-medium border-white border-s-2">
                            IQD {parseInt(order.Products.price_cell) * parseInt(order.amount)}
                          </td>
                        </tr>
                      )
                    })}
                    <br />

                    <tr>
                      <td className="justify-center p-4 pb-4 text-base font-normal align-middle border border-white text-end">
                        <span className="font-bold pe-12">Total :</span>
                        {total} IQD
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap justify-between gap-6 mt-28">
                <div>
                  <span className="text-lg font-bold">Payment Info:</span>
                  <p className="pt-2 text-sm font-medium">
                    Account No: <span className="font-bold">Credit</span>
                  </p>
                  <p className="text-sm font-medium">
                    Name: <span className="font-bold">1CC Driver</span>
                  </p>
                  {/* <p className="text-sm font-medium">
                    Bank Account: <span className="font-bold">0123 456 7890</span>
                  </p> */}
                </div>

                <div></div>
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
