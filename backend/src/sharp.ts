import axios from 'axios';
import sharp from 'sharp';
import puppeteer from 'puppeteer';

interface CompositeImageOptions {
  mainImageUrl: string;
  addContent: string;
}

// Function to fetch the main image as a buffer
const fetchMainImage = async (mainImageUrl: string): Promise<Buffer> => {
  const response = await axios.get(mainImageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
};

// Function to create an image from HTML content
const createHtmlImage = async (addContent: string, width: number): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
    <style>
      .container {
        width: ${width}px;
        height: 200px;
        font-size: 20px;
      }
    </style>
    <div class="container">
        <div class="container">${addContent}</div>
    </div>
  `);
    //     <div style=" height: 200px; background-color: #f0f0f0" ; display:"flex" justifyContent : "space-between">
    //     <img src="https://www.fabianferno.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fportrait.a4345096.png" height="200px" width="200px" style="object-fit: cover;" style="border-radius : 50%">
    //     <p style="font-size: 24px; color: #333;">This is an example HTML content.</p>
    // </div>

  const element = await page.$('.container');
  const buffer = await element!.screenshot({ omitBackground: true });
  await browser.close();
  return buffer;
};


// Function to composite the images, resize if necessary, and return base64-encoded image data
export const compositeAndEncodeBase64 = async ({
  mainImageUrl,
  addContent
}: CompositeImageOptions): Promise<string> => {
  try {
    const mainImageBuffer = await fetchMainImage(mainImageUrl);
    const mainImage = sharp(mainImageBuffer);
    const mainImageMetadata = await mainImage.metadata();

    const htmlImageBuffer = await createHtmlImage(addContent, mainImageMetadata.width as number);

    const combinedWidth = mainImageMetadata.width || 0;
    const combinedHeight = (mainImageMetadata.height || 0) + 200; // Height of main image + HTML div

    const combinedImage = sharp({
      create: {
        width: combinedWidth,
        height: combinedHeight,
        channels: 4, // Use 4 channels for RGBA to handle transparency
        background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
      }
    });

    // Composite main image and HTML div
    const compositeImageBuffer = await combinedImage
      .composite([
        { input: mainImageBuffer, top: 0, left: 0 },
        { input: htmlImageBuffer, top: mainImageMetadata.height || 0, left: 0 }
      ])
      .png()
      .toBuffer();

    // Resize image if necessary to reduce file size (less than 256KB)
    const resizedImageBuffer = await sharp(compositeImageBuffer)
      .resize({ width: combinedWidth }) // Resize if necessary to fit within 256KB
      .jpeg({ quality: 80 }) // Adjust JPEG quality to reduce file size
      .toBuffer();

    // Convert resized image buffer to base64
    const base64Image = resizedImageBuffer.toString('base64');

    // Output the base64 data URI
    const dataURI = `data:image/jpeg;base64,${base64Image}`;
    // console.log('Base64 Image:', dataURI);

    return dataURI;
  } catch (err) {
    console.error('Error:', err);
    throw new Error('Failed to composite and encode image.');
  }
};