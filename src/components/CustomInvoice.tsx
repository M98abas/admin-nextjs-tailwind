import { useEffect, useRef, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import MomentP from './MomentP'
import moment from 'moment'

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
                <h2 className="text-2xl font-semibold"></h2>
                <img src="blueLogo.png" alt="" width={300} height={120} />
              </div>
              <hr />
              <div className="flex flex-wrap items-center justify-between gap-6 py-4" dir="rtl">
                <h5 className="text-base font-normal">
                  <span className="font-bold">التاريخ:</span>{' '}
                  {moment(invoiceData.created_at).format('YYYY/MM/DD')}
                </h5>
                {/* <h5 className="text-base font-normal">
                  <span className="font-bold">Invoice No:</span> {invoiceData.id}
                </h5> */}
              </div>
              <hr />
              <div className="flex flex-wrap items-center justify-between gap-6 mt-4" dir="rtl">
                <div>
                  <h4 className="text-base font-bold">الى:</h4>
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
                      total +=
                        total + parseInt(order.Products.price_cell) * parseInt(order.quantity)
                      return (
                        <tr className="text-center" key={index}>
                          <td className="p-5 text-base font-medium border-white border-s-2">
                            {order.Products.titleEn}
                          </td>
                          <td className="p-5 text-base font-medium border-white border-s-2">
                            IQD {order.Products.price_cell}
                          </td>
                          <td className="p-5 text-base font-medium border-white border-s-2">
                            {order.quantity}
                          </td>
                          <td className="p-5 text-base font-medium border-white border-s-2">
                            IQD {parseInt(order.Products.price_cell) * parseInt(order.quantity)}
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

              <div className="flex flex-wrap justify-between gap-6 mt-28" dir="rtl">
                <div>
                  <span className="text-4xl font-bold size-30 text-[#3aa2da]">امير و مصطفى</span>
                  <p className="pt-2 text-2xl font-medium text-[#3aa2da] mt-1 mb-3">
                    المؤسسين التنفيذيين
                  </p>
                  <div className="flex justify-between w-96">
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium">
                        رقم الهاتف: <span className="font-bold"></span>
                      </p>
                      <p className="text-sm font-medium">
                        ايميل: <span className="font-bold"></span>
                      </p>
                    </div>
                    <p>Sign</p>
                  </div>
                  <br />
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium">
                      البريد الالكتروني: <span className="font-bold"></span>
                    </p>
                    <p className="text-sm font-medium">
                      مقر الشركة: <span className="font-bold"></span>
                    </p>
                  </div>
                  {/* <p className="text-sm font-medium">
                    Bank Account: <span className="font-bold">0123 456 7890</span>
                  </p> */}
                </div>
                <img src="./bllackLogo.png" alt="LOgo" width={400} />
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
