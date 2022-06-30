import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/alert';
interface Props {
  color: color;
  icon: string;
  title: string;
  amount: string;
  percentage: string;
  percentageIcon: string;
  percentageColor: string;
  date: string;
}

export default function StatusCard({
  color,
  icon,
  title,
  amount,
  percentage,
  percentageColor,
  percentageIcon,
  date,
}: Props) {
  return (
    <div className="px-4 mb-10">
      <Card>
        <CardBody>
          <CardHeader color={color} className="mb-0">
            <IconButton>
              <i className="fas fa-heart" />
            </IconButton>
          </CardHeader>

          <Typography title={title} amount={amount} />
        </CardBody>

        <CardFooter color={percentageColor}>
          <IconButton>
            <i className="fas fa-heart" />
          </IconButton>
        </CardFooter>
      </Card>
    </div>
  );
}
