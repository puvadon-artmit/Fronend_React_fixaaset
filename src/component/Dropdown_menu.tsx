import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Typography, Box } from '@mui/material';
import WidgetsIcon from '@mui/icons-material/Widgets';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import DvrIcon from '@mui/icons-material/Dvr';
import ConstructionIcon from '@mui/icons-material/Construction';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import TvIcon from '@mui/icons-material/Tv';
import TerminalIcon from '@mui/icons-material/Terminal';
import LanIcon from '@mui/icons-material/Lan';
import RouterIcon from '@mui/icons-material/Router';
import PrintIcon from '@mui/icons-material/Print';
import OpacityIcon from '@mui/icons-material/Opacity';
import DevicesIcon from '@mui/icons-material/Devices';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TableChartIcon from '@mui/icons-material/TableChart';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import CableIcon from '@mui/icons-material/Cable';
import SimCardIcon from '@mui/icons-material/SimCard';
import ListIcon from '@mui/icons-material/List';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} TransitionProps={{ timeout: 200 }} />
))(({ theme }) => ({
    boxShadow: 'none',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function Dropdown_menu() {
    const [expanded, setExpanded] = React.useState<string | false>('');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };



    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <WidgetsIcon sx={{ marginRight: '6px', color: '#01345d' }} />
                    <Typography>Asset</Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                        <DashboardIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                            dashboard
                        </Typography>
                    </Box>
                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <ComputerIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                            คอมพิวเตอร์
                        </Typography>
                    </Box>
                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <TvIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                            จอภาพ
                        </Typography>
                    </Box>
                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <TerminalIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                            โปรแกรม
                        </Typography>
                    </Box>
                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <RouterIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                            อุปกรณ์เน็ตเวิร์ค
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <LanIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                            อุปกรณ์เพิ่มเติม
                        </Typography>
                    </Box>
                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <PrintIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                            ปริ้นเตอร์
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <OpacityIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                            ตลับหมึก
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <DevicesIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                           วัสดุสิ้นเปลือง
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <LocalPhoneIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                           โทรศัพท์
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <TableChartIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                           Rack
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <AllInboxIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                          Enclosure
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <ElectricalServicesIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                         PDU
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <DevicesOtherIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                        Passive devices
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <BorderOuterIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                        Unmanaged
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <CableIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                        Cable
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <SimCardIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                        Simcard
                        </Typography>
                    </Box>

                    <hr className='mt-2' />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <ListIcon sx={{ marginRight: 1, color: '#01345d' }} />
                        <Typography>
                        โกลบอล
                        </Typography>
                    </Box>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <HeadsetMicIcon sx={{ marginRight: '6px', color: '#01345d' }} />
                    <Typography>ความช่วยเหลือ</Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <DvrIcon sx={{ marginRight: '6px', color: '#01345d' }} />
                    <Typography>การจัดการ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <ConstructionIcon sx={{ marginRight: '6px', color: '#01345d' }} />
                    <Typography>เครื่องมือ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <ManageAccountsIcon sx={{ marginRight: '6px', color: '#01345d' }} />
                    <Typography>จัดการระบบ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                    <SettingsIcon sx={{ marginRight: '6px', color: '#01345d' }} />
                    <Typography>ตั้งค่า</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}