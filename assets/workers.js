// JSON 파일을 불러오는 함수
fetch('assets/names.json')
    .then(response => response.json()) // JSON 형식으로 변환
    .then(data => {
        // 출근자 목록과 인원수 업데이트
        const activeList = document.getElementById('active-list');
        const activeCount = document.getElementById('active-count');
        data.active.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name.name;
            activeList.appendChild(li);
        });
        activeCount.textContent = `(${data.active.length}명)`; // 인원수 표시

        // 휴가자 목록과 인원수 업데이트
        const vacationList = document.getElementById('vacation-list');
        const vacationCount = document.getElementById('vacation-count');
        data.onVacation.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name.name;
            vacationList.appendChild(li);
        });
        vacationCount.textContent = `(${data.onVacation.length}명)`; // 인원수 표시

        // 휴직자 목록과 인원수 업데이트
        const leaveList = document.getElementById('leave-list');
        const leaveCount = document.getElementById('leave-count');
        data.onLeave.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name.name;
            leaveList.appendChild(li);
        });
        leaveCount.textContent = `(${data.onLeave.length}명)`; // 인원수 표시
    })
    .catch(error => console.error('Error loading JSON:', error));
