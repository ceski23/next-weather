import { LocationToSave } from 'lib/api/locations';
import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import prisma from 'lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401).end();
  
  switch (req.method) {
    case 'GET': {
      const savedLocations = await prisma.savedLocation.findMany({
        where: {
          userId: session.userId as string
        }
      });

      return res.json(savedLocations);
    }
    
    case 'POST': {
      const location = req.body as LocationToSave;

      const savedLocation = await prisma.savedLocation.create({
        data: {
          name: location.name,
          lat: location.lat,
          lon: location.lon,
          user: {
            connect: { email: session.user.email }
          }
        },
      });
      
      return res.json(savedLocation);
    }
  
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}

export default handler;