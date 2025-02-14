import express from "express";
import {PostgresEntertainmentService} from "@/entertainment/postgres-entertainment-service.ts";
import {Employee} from "@/entertainment/entertainment.ts";

const router = express.Router();
const service = new PostgresEntertainmentService();

router.get('/departments', async (req, res) => {
    try {
        const results = await service.getDepartments();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

router.get('/employees', async (req, res) => {
    try {
        const results = await service.getEmployees();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});
router.post('/employees', async (req, res) => {
    try {
        const { emp_code, emp_name, emp_mgt, emp_sal, emp_rcode } = req.body;
        const employee = new Employee(
            emp_code,
            emp_name,
            emp_mgt,
            emp_sal,
            emp_rcode
        );

        const results = await service.insertEmployee(employee);

        res.json({
            message: `${results}개의 행이 추가되었습니다`
        })
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});
router.delete('/employees', async (req, res) => {
    try {
        const { emp_code } = req.body;

        const results = await service.deleteEmployee(emp_code);

        res.json({
            message: `${results}개의 행이 삭제되었습니다.`
        })
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});
router.get('/employees/salaries/stats', async (req, res) => {
  try {
    const results = await service.getEmployeeSalarySumAndAvg();
    res.json(results);
  } catch (e) {
    console.error('Error fetching Entertainment : ', e);
    res.status(500)
      .json({ error: 'Internal Server Error' });
  }
});
router.get('/employees/managers', async (req, res) => {
  try {
    const results = await service.getAllEmployeeNameAndManagerName();
    res.json(results);
  } catch (e) {
    console.error('Error fetching Entertainment : ', e);
    res.status(500)
      .json({ error: 'Internal Server Error' });
  }
});
router.get('/employees/salaries', async (req, res) => {
  try {
    const results = await service.getAllEmployeeNameAndSalary();
    res.json(results);
  } catch (e) {
    console.error('Error fetching Entertainment : ', e);
    res.status(500)
      .json({ error: 'Internal Server Error' });
  }
});
router.get('/employees/roles/salaries/stats', async (req, res) => {
  try {
    const filter = parseInt(req.query.filter as string);

    if (Number.isNaN(filter)) {
      res.status(401).json({
        message: 'Bad Request',
      });
      return;
    }
    const results = await service.getEmployeesSalaryDataByRoleFromSalaryAvg(filter);
    res.json(results);
  } catch (e) {
    console.error('Error fetching Entertainment : ', e);
    res.status(500)
      .json({ error: 'Internal Server Error' });
  }
});
router.get('/employees/salaries/above-average', async (req, res) => {
  try {
    const results = await service.getEmployeesByHigherThanAvgSalary();
    res.json(results);
  } catch (e) {
    console.error('Error fetching Entertainment : ', e);
    res.status(500)
      .json({ error: 'Internal Server Error' });
  }
});
router.patch('/employees/:id/promotion', async (req, res) => {
  try {
    const id = req.params.id as string;
    const { role_name, percentage } = req.body;
    const results = await service.updateEmployeeRoleAndSalary(id, role_name, percentage);

    res.json({
      message: `${results}개의 행이 업데이트되었습니다.`
    })
  } catch (e) {
    console.error('Error fetching Entertainment : ', e);
    res.status(500)
      .json({ error: 'Internal Server Error' });
  }
});

router.get('/dramas', async (req, res) => {
    try {
        const broadcastsQuery = req.query.broadcasts as string;

        if (broadcastsQuery) {
            const broadcasts = broadcastsQuery.split(",");
            const results = await service.getDramasByBroadcasts(broadcasts);

            res.json(results);
            return;
        }

        const results = await service.getDramas();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});
router.get('/dramas/broadcasts', async (req, res) => {
    try {
        const results = await service.getDramaBroadcasts();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});
router.get('/dramas/not-open', async (req, res) => {
  try {
    const results = await service.getDramasbyNotOpen();
    res.json(results);
  } catch (e) {
    console.error('Error fetching Entertainment : ', e);
    res.status(500)
      .json({ error: 'Internal Server Error' });
  }
});
router.patch('/dramas/not-open', async (req, res) => {
    try {
        const { open_date } = req.body;

        const results = await service.updateDramaOpenDateIfNull(open_date);
        res.json({
            message: `${results}개의 행이 업데이트되었습니다.`
        });
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});


export default router;